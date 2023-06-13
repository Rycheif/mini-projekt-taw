import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'restock-product-form',
  templateUrl: './restock-product-form.component.html',
  styleUrls: ['./restock-product-form.component.css']
})
export class RestockProductFormComponent implements OnInit {

  stockForm: FormGroup;

  @Input() stock: number = 0;
  @Output() onSubmit: EventEmitter<number> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.stockForm = this.formBuilder.group({
      quantity: new FormControl(0, Validators.required)
    });
  }

  ngOnInit(): void {
    this.stockForm.get('quantity')?.setValue(this.stock);
  }

  submitForm(data: number) {
    this.onSubmit.emit(data);
    this.stockForm.reset();
  }

}
