import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProductPage} from "../../models/Product";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: IProductPage;

  page: number = 1;
  limit: number = 20;

  constructor(private productService: ProductService) {
    this.products$ = {
      result: [],
      currentPage: 1,
      totalPages: 1
    };
  }

  ngOnInit(): void {
    this.getPage();
  }

  private getPage() {
    this.productService.getPageOfProducts(this.page, this.limit)
      .subscribe(response => {
        this.products$ = response;
        console.log(this.products$);
      });
  }

}
