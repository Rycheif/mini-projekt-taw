import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {IProduct} from "../../models/Product";

@Component({
  selector: 'manage-product-form',
  templateUrl: './manage-product-form.component.html',
  styleUrls: ['./manage-product-form.component.css']
})
export class ManageProductFormComponent implements OnInit {

  productForm: FormGroup;
  currencies: string[] = ['PLN', 'EUR', 'USD'];

  @Output() onSubmit: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Input() initialData?: IProduct;

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.productForm = this.formBuilder.group({
      manufacturer: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      currency: new FormControl(this.currencies[2], Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.setupFormWithValues();
    }
  }

  changeCurrency($event: any) {
    const currency = $event.target.value.split(' ')[1] as string;
    if (currency && currency.length !== 0) {
      this.productForm.get('currency')?.setValue(currency, {
        onlySelf: true,
      });
    }
  }

  submitForm(data: IProduct) {
    this.onSubmit.emit(data);
    this.productForm.reset();
  }

  setupFormWithValues() {
    this.productForm.get('manufacturer')?.setValue(this.initialData?.manufacturer);
    this.productForm.get('name')?.setValue(this.initialData?.name);
    this.productForm.get('image')?.setValue(this.initialData?.image);
    this.productForm.get('price')?.setValue(this.initialData?.price);
    this.productForm.get('currency')?.setValue(this.initialData?.currency);
    this.productForm.get('description')?.setValue(this.initialData?.description);
  }

}
