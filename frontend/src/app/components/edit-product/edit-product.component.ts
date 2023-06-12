import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../../models/Product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  private id: string = '';

  editProductForm: FormGroup;
  currencies: string[] = ['PLN', 'EUR', 'USD'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.getIdFromUrl();
    this.editProductForm = this.formBuilder.group({
      manufacturer: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      currency: new FormControl(this.currencies[2], Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.productService.getProductById(this.id)
      .subscribe(result => {
        this.editProductForm.get('manufacturer')?.setValue(result.manufacturer);
        this.editProductForm.get('name')?.setValue(result.name);
        this.editProductForm.get('image')?.setValue(result.image);
        this.editProductForm.get('price')?.setValue(result.price);
        this.editProductForm.get('currency')?.setValue(result.currency);
        this.editProductForm.get('description')?.setValue(result.description);
      });
  }

  createOrUpdate(data: IProduct) {
    data._id = this.id;
    this.productService.createNewOrUpdate(data);
    this.editProductForm.reset();
    this.router.navigate(['/']);
  }

  changeCurrency($event: any) {
    this.editProductForm.get('currency')?.setValue($event.target?.value, {
      onlySelf: true,
    });
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
