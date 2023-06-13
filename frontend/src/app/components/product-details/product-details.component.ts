import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IProduct} from "../../models/Product";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private id: string = '0';

  product: IProduct;
  editedProduct?: IProduct;

  closeResult = '';
  showSpinner: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {
    this.product = {
      manufacturer: 'Acme',
      image: 'assets/placeholder.png',
      currency: 'USD',
      price: 0,
      description: 'No description',
      name: 'Anvil',
      quantity: 0
    };
  }

  ngOnInit(): void {
    this.getIdFromUrl()
    this.productService.getProductById(this.id)
      .subscribe(result => {
        this.product = result;
      });
  }

  openDeleteModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'delete-modal-basic-title'})
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
        });
  }

  openEditModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'edit-modal-basic-title'})
      .result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (this.editedProduct) {
            this.productService.createNewOrUpdate(this.editedProduct);
            this.router.navigate(['/products'], {queryParams: {page: 1, limit: 20}})
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  closeModal(modal: any, reason: string) {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      modal.close(reason);
    }, 2000);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  editProduct(data: IProduct, modal: any) {
    data._id = this.id;
    this.editedProduct = data;
    this.closeModal(modal, 'Form submitted');
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
