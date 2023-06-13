import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models/Product";

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  showSpinner: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router) {
  }

  addProduct(data: IProduct) {
    this.showSpinner = true;
    setTimeout(() => {
      this.productService.createNewOrUpdate(data);
      this.router.navigate(['/products'], {queryParams: {page: 1, limit: 20}});
    }, 2000);
  }

}
