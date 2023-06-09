import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  formControlsNames: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      loginOrEmail: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    this.formControlsNames = this.controlsNames();
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

  private controlsNames() {
    const controls = this.loginForm.controls;
    const names = []
    for (let key in controls) {
      names.push(key);
    }
    return names;
  }

}
