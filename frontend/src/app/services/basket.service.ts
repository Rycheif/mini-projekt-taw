import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ProductService} from "./product.service";
import {IProduct} from "../models/Product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {config} from "../config/config";
import {AddProductToBasketRequest} from "../models/Basket";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket$: IProduct[] = []

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private httpClient: HttpClient) {
    this.productService.getProductsFromBasket()
      .subscribe(value => {
        if (value) {
          this.basket$ = value;
          return;
        }
        this.basket$ = [];
      });
  }

  getBasket() {
    return this.basket$;
  }

  addToBasket(id: string, quantity: number) {
    const token = this.authService.getToken();
    const currentUserId = this.authService.currentUserId;
    if (!token || !currentUserId) {
      return;
    }

    const product: AddProductToBasketRequest = {
      productId: id,
      quantity: quantity,
      userId: currentUserId
    }

    this.httpClient.patch(config.baseUrl + config.basket + '/add-product',
      product,
      {
        headers: new HttpHeaders({
          'Authorization': token
        })
      }).subscribe();
  }

  buyProducts() {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
    this.httpClient.patch(config.baseUrl + config.basket + '/clear-users-basket/' + this.authService.currentUserId,
      {},
      {
        headers: new HttpHeaders({
          'Authorization': token
        })
      }).subscribe();
  }

}
