import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IAuthUser, ICreateOrUpdateUser} from "../models/User";
import {config} from "../config/config";
import {DecodedToken, Token} from "../models/Token";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  createOrUpdate(userData: ICreateOrUpdateUser) {
    this.http.post<ICreateOrUpdateUser>(config.baseUrl + config.user, userData).subscribe();
  }

  authenticate(credentials: IAuthUser) {
    return this.http.post<IAuthUser>(config.baseUrl + config.user + "/auth", credentials)
      .pipe(map((result: Token | any) => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }));
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !jwtHelper.isTokenExpired(token);
  }

  isAdmin() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token || jwtHelper.isTokenExpired(token)) {
      return false;
    }
    const decodedToken = jwtHelper.decodeToken<DecodedToken>(token);
    if (!decodedToken) {
      return false;
    }
    return decodedToken.isAdmin;
  }

  logout() {
    const token = this.getToken();
    if (!token) {
      return;
    }
    return this.http.delete(config.baseUrl + config.user + "/logout/" + this.currentUser, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(["/"]);
    });
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken<DecodedToken>(token)?.userId;
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
