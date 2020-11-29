import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  lastWeightRecord: number;
  showActions = true;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private userService: UserService) { 
    this.subscription = this.authService.appUser$.subscribe( u => {
      this.appUser = new AppUser(u);
      this.lastWeightRecord = this.appUser.lastWeight;
      console.log("User data: ", this.appUser);
    })
  }

  ngOnInit() {}

  save(value: number) {
    let date = new Date().getTime();
    
    this.appUser.weight.push({date: date, weightToday: value['weight']})
    console.log("From value: ", value);
    
    console.log(this.appUser);
    
    if (this.appUser.userId) this.userService.update(this.appUser.userId, this.appUser);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}