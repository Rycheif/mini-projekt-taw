import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ICreateOrUpdateUser} from "../../models/User";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      email: '',
      login: '',
      password: '',
      reEnteredPassword: '',
    });
  }


  createOrUpdate(data: ICreateOrUpdateUser) {
    this.authService.createOrUpdate(data);
    this.registrationForm.reset();
  }

}
