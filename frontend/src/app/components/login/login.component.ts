import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {IAuthUser} from "../../models/User";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      loginOrEmail: '',
      password: ''
    });
  }

  loginUser(data: IAuthUser) {
    return this.authService.authenticate(data)
      .subscribe(result => {
        if (result) {
          this.loginForm.reset();
          this.router.navigate(['/']);
        }
      });
  }

}
