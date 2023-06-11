import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models/Product";

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  createProductForm: FormGroup;
  currencies: string[] = ['PLN', 'EUR', 'USD'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.createProductForm = this.formBuilder.group({
      manufacturer: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      currency: new FormControl(this.currencies[2], Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createOrUpdate(data: IProduct) {
    this.productService.createNewOrUpdate(data);
    this.createProductForm.reset();
    this.router.navigate(['/']);
  }

  changeCurrency($event: any) {
    this.createProductForm.get('currency')?.setValue($event.target?.value, {
      onlySelf: true,
    });
  }
}
