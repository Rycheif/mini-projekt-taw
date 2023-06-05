import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProductPage} from "../../models/Product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: IProductPage;

  currentPage: number = 1;
  limit: number = 20;
  collectionSize = 1;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {
    this.products$ = {
      count: 1,
      result: [],
      currentPage: 1,
      totalPages: 1
    };
  }

  ngOnInit(): void {
    this.getUrlQueryParams();
    this.getPage();
  }

  changePage(newPage: number) {
    this.router.navigate(["/products"], {
      queryParams: {
        page: newPage,
        limit: 20
      }
    });
    this.getPage();
  }

  private getUrlQueryParams() {
    this.activatedRouter.queryParamMap
      .subscribe(params => {
        this.currentPage = Number(params.get("page"));
        this.limit = Number(params.get("limit"));
      });
  }

  private getPage() {
    this.productService.getPageOfProducts(this.currentPage, this.limit)
      .subscribe(response => {
        this.products$ = response;
        this.collectionSize = response.count;
      });
  }
}
