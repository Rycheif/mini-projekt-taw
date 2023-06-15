import {Component} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  showSpinner = false;

  constructor(private basketService: BasketService, private router: Router) {
  }

  get basket() {
    return this.basketService.getBasket();
  }

  buy() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.basketService.buyProducts();
      this.router.navigate(['/']).then(() => window.location.reload());
    }, 2000);
  }

}
