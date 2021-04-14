import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  appUser: AppUser;
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
    this.authService.appUser$.pipe(take(1)).subscribe(user => this.appUser = new AppUser(user));
  }

  ngOnInit(): void {
  }

  save(value) {
    console.log(this.appUser);
    
    if (this.appUser.userId) this.userService.update(this.appUser.userId, this.appUser);

    this.router.navigate(['/'])
  }
  
  delete() {
    if (!confirm('Are you sure you want to delete your profile?')) return;
    this.userService.delete(this.appUser.userId);
    this.router.navigate(['/']);
  }

}
