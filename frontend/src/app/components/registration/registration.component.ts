import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICreateOrUpdateUser} from "../../models/User";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  formControlsNames: string[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.registrationForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      login: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      reEnteredPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });

    this.formControlsNames = this.controlsNames();
  }

  createOrUpdate(data: ICreateOrUpdateUser) {
    this.authService.createOrUpdate(data);
    this.registrationForm.reset();
  }

  private controlsNames() {
    const controls = this.registrationForm.controls;
    const names = []
    for (let key in controls) {
      names.push(key);
    }
    return names;
  }

}
