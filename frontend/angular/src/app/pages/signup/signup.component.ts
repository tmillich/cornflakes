import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormgroupService} from '../../services/formgroup.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signup: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.signup = FormgroupService.getSignUpFormGroup();
  }

  onSubmit() {
    const authUser = {
      uid: 0,
      email: this.signup.get('email').value,
      emailVerified: false,
      disabled: false,
      password: this.signup.get('password').value,
      phoneNumber: this.signup.get('phone').value,
      displayName: this.signup.get('firstname').value + ' ' + this.signup.get('lastname').value,
    };
    this.authService.signup(authUser);
  }

  loginLink() {
    this.router.navigate(['/login']);
  }

}
