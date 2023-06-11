import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'product-buttons',
  templateUrl: './product-buttons.component.html',
  styleUrls: ['./product-buttons.component.css']
})
export class ProductButtonsComponent {

  @Input() productId: string = '0';

  constructor(private router: Router) {
  }

  goToDetails() {
    this.router.navigate(['/products/details/' + this.productId]);
  }

}
