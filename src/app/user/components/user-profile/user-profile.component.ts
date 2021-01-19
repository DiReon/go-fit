import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    this.authService.appUser$.pipe(take(1)).subscribe(user => {
      this.appUser = new AppUser(user);
      // console.log("Last user weight record: ", this.appUser.lastWeightRecord);
      // if (!this.appUser.lastWeight) this.appUser.weight = [{date: null, weightToday: null}]
    });
  }

  ngOnInit(): void {
  }

  save(value) {
    console.log("Form value: ", value);
    let date = new Date().getTime();
    // this.appUser.weight.push({date: date, weightToday: this.appUser.lastWeightRecord})
    // console.log("User weight records: ", this.appUser.weight);
    if (this.appUser.userId) this.userService.update(this.appUser.userId, this.appUser);
    // if (this.appUser.userId) this.userService.update(this.appUser.userId, this.appUser.weight);

    this.router.navigate(['/'])
  }
  
  delete() {
    if (!confirm('Are you sure you want to delete your profile?')) return;
    this.userService.delete(this.appUser.userId);
    this.router.navigate(['/']);
  }

}
