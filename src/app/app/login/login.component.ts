import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private emailControl: FormControl;
  private passControl: FormControl;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.emailControl = new FormControl('', Validators.required);
    this.passControl = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      emailControl: this.emailControl,
      passControl: this.passControl
    });
  }

  loginFucntion(form: FormGroup) {
    console.log('form', form)
    this.authService.login(form.value.emailControl, form.value.passControl).subscribe(data => {
      console.log('data login',data)
    });
  }
}
