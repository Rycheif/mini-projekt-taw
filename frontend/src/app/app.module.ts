import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ProductsComponent} from './components/products/products.component';
import {ProductItemComponent} from './components/product-item/product-item.component';
import {ProductImageComponent} from './components/product-image/product-image.component';
import {ProductTextComponent} from './components/product-text/product-text.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProductButtonsComponent} from './components/product-buttons/product-buttons.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {InvalidFormDirective} from './directives/invalid-form.directive';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ManageProductFormComponent} from './components/manage-product-form/manage-product-form.component';
import {RestockProductFormComponent} from './components/restock-product-form/restock-product-form.component';
import {BasketComponent} from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductImageComponent,
    ProductTextComponent,
    RegistrationComponent,
    ProductButtonsComponent,
    LoginComponent,
    LogoutComponent,
    InvalidFormDirective,
    ProductDetailsComponent,
    AddProductComponent,
    ManageProductFormComponent,
    RestockProductFormComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
