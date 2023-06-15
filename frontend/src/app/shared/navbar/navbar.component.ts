import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMenuCollapsed = true;

  basketSize: number = 0;

  constructor(private authService: AuthService) {
    this.authService.currentUser
      .subscribe(value => {
        if (value) {
          this.basketSize = value.products.length;
          return;
        }
        this.basketSize = 0;
      });
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
