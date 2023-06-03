import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICreateOrUpdateUser} from "../models/User";
import {config} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createOrUpdate(userData: ICreateOrUpdateUser) {
    console.log(userData);
    this.http.post<ICreateOrUpdateUser>(config.baseUrl + config.user, userData);
  }

}
