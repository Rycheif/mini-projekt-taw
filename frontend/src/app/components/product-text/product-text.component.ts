import {Component, Input} from '@angular/core';

@Component({
  selector: 'product-text',
  templateUrl: './product-text.component.html',
  styleUrls: ['./product-text.component.css']
})
export class ProductTextComponent {

  @Input() id?: string;
  @Input() manufacturer: string = 'Acme Corporation';
  @Input() productName: string = 'Anvil';
  @Input() price: number = 0;
  @Input() currency: string = 'USD';

}
