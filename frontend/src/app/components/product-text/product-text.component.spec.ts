import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductTextComponent} from './product-text.component';

describe('ProductTextComponent', () => {
  let component: ProductTextComponent;
  let fixture: ComponentFixture<ProductTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
