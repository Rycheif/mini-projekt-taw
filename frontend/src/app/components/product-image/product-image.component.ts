import {Component, Input} from '@angular/core';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  @Input() image: string  = "assets/placeholder.jpg";

}
