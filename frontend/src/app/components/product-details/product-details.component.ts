import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string = '0';
  manufacturer: string = 'Acme Corporation';
  productName: string = 'Anvil';
  price: number = 0;
  quantity: number = 0;
  currency?: string = 'USD';
  image: string = 'assets/placeholder.png';

  closeResult = '';
  showSpinner: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getIdFromUrl()
    this.productService.getProductById(this.id)
      .subscribe(result => {
        this.manufacturer = result.manufacturer;
        this.productName = result.name;
        this.price = result.price;
        this.quantity = result.quantity;
        this.currency = result.currency;
        if (result.image && result.image.length !== 0) {
          this.image = result.image;
        }
      });
  }

  openDeleteModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.deleteProduct();
          this.router.navigate(['/products'], {queryParams: {page: 1, limit: 20}})
            .then(() => window.location.reload());
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }

  closeModal(modal: any, reason: string) {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      modal.close(reason);
    }, 2000);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private deleteProduct() {
    this.productService.deleteProduct(this.id);
  }

  private getIdFromUrl() {
    this.activatedRouter.paramMap
      .subscribe(params => {
        const productId = params.get('productId');
        if (productId) {
          this.id = productId;
        }
      });
  }

}
