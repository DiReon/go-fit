import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email2;
  password2;
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
  }
  login() {
    this.authService.login();
  }
  loginByEmail(value) {
    this.authService.loginByEmail(value['email'], value['password']);
  }
}
