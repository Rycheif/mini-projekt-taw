import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IProduct, IProductPage} from "../models/Product";
import {config} from "../config/config";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createNewOrUpdate(data: IProduct) {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
    this.http.post<IProduct>(config.baseUrl + config.products, data, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }).subscribe();
  }

  getProductById(productId: string) {
    return this.http.get<IProduct>(config.baseUrl + config.products + `/${productId}`);
  }

  getByName(name: string) {
    return this.http.get<IProduct[]>(config.baseUrl + config.products + `?name=${name}`);
  }

  getByManufacturer(manufacturer: string) {
    return this.http.get<IProduct[]>(config.baseUrl + config.products + `?manufacturer=${manufacturer}`);
  }

  getPageOfProducts(page: number, limit: number) {
    return this.http.get<IProductPage>(config.baseUrl + config.products + `?page=${page}&limit=${limit}`);
  }

  getProductsFromBasket() {
    return this.http.get<IProduct[]>(config.baseUrl + config.products + `/products-from-basket/` + this.authService.currentUserId);
  }

  deleteProduct(productId: string) {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
    this.http.delete(config.baseUrl + config.products + `/delete/${productId}`, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }).subscribe();
  }

}
