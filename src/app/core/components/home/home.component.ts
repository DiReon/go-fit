import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { MyRecord } from 'src/app/shared/models/my-record';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  weight: number;
  showActions = true;
  date: string;
  showConfirmationMsg = false;
  subscription: Subscription;
  kkal: number;
  steps: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { 
    this.subscription = this.authService.appUser$.subscribe( u => {
      if (u) {
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.appUser = new AppUser(u);
        this.load();
      };
    })
  }

  ngOnInit() {}

  load() {
    if (this.appUser.journal) 
      console.log(Object.values(this.appUser.journal));
      let record = Object.values(this.appUser.journal).filter(r => r.date == this.date)[0];
      if (record) {
        this.kkal = record.kkal;
        this.steps = record.steps;
        this.weight = record.weight;
      } else this.kkal = this.steps = this.weight = null
  }

  save(value: MyRecord) {
    let date = new Date().getTime();
    value.dateRecorded = date;
    console.log("Form value: ", value);
    console.log(this.appUser);
    
    if (this.appUser.userId) this.userService.addToJournal(this.appUser.userId, value)
    this.showConfirmationMsg = true;
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}