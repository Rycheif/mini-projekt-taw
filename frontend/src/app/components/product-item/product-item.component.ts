import {Component, Input} from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() id?: string;
  @Input() manufacturer: string = 'Acme Corporation';
  @Input() productName: string = 'Anvil';
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  @Input() currency: string = 'USD';
  @Input() image: string = 'assets/placeholder.png';
  @Input() description: string = 'No description';
}
