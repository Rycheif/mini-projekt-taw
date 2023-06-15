import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {canActivate} from "./services/auth.guard";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {canAdminActivate} from "./services/admin-auth.guard";
import {BasketComponent} from "./components/basket/basket.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/details/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [canAdminActivate]
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [canActivate]
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
