import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProductPage} from "../../models/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: IProductPage[] = [];

  page: number = 1;
  limit: number = 20;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.productService.getPageOfProducts(this.page, this.limit)
      .subscribe(value => {
        this.products$ = value;
      });
  }

}
