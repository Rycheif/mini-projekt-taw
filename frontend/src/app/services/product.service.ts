import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct, IProductPage} from "../models/Product";
import {config} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createNewOrUpdate(data: IProduct) {
    this.http.post<IProduct>(config.baseUrl + config.products, data).subscribe();
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

  deleteProduct(productId: string) {
    this.http.delete(config.baseUrl + config.products + `/delete/${productId}`);
  }

}
