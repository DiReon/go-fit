import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email2;
  isSent = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword(value) {
    this.authService.sendPasswordResetEmail(value['email']);
    this.isSent = true;
    console.log(this.isSent);
    
  }

}
