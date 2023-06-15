import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'product-buttons',
  templateUrl: './product-buttons.component.html',
  styleUrls: ['./product-buttons.component.css']
})
export class ProductButtonsComponent {

  @Input() productId: string = '0';

  constructor(private router: Router, private basketService: BasketService) {
  }

  goToDetails() {
    this.router.navigate(['/products/details/' + this.productId]);
  }

  addToCart() {
    this.basketService.addToBasket(this.productId, 1);
  }

}
