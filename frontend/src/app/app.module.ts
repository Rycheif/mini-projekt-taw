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
