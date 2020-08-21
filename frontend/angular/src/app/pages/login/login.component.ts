import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormgroupService} from '../../services/formgroup.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/landingpage/cornflaketable']);
    }
    this.loginForm = FormgroupService.getLoginFormGroup();
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.loginEmail(email, password);
  }

  googleLogin() {
    this.authService.loginGoogle();
  }

  signupLink() {
    this.router.navigate(['/signup']);
  }

}
