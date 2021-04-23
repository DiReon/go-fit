import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  card = {
    route: null,
    isFlipped: false
  }
  constructor(
    private authService: AuthService,
    private router: Router) { 
      this.subscription = this.authService.appUser$.subscribe( u => {
      if (u) {
        if (!u.name) this.router.navigate(['user-profile']);
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.appUser = new AppUser(u);
        console.log("HomeComponent loaded");
        
      };
    })
  }

  ngOnInit() {}

  onClick(value) {
    this.card.route = value;
    this.card.isFlipped = true;
    setTimeout(() => {
      this.router.navigate([`/${value}`])
    }, 500)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}