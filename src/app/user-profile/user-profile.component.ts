import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: AppUser = null;
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
    this.authService.appUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  save(value) {
    if (this.user.userId) this.userService.update(this.user.userId, value);
    this.router.navigate(['/'])
  }
  
  delete() {
    if (!confirm('Are you sure you want to delete your profile?')) return;
    this.userService.delete(this.user.userId);
    this.router.navigate(['/']);
  }

}
