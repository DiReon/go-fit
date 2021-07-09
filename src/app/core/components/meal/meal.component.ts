import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit, OnDestroy {
  meal;
  mealId;
  appUser: AppUser;
  subscription: Subscription;
  constructor(
    private mealService: SharedService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { 
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u);
    this.mealId = this.route.snapshot.paramMap.get('mealId');
    
    this.subscription = this.mealService.get('meals', this.mealId).valueChanges().subscribe(m => {
      this.meal = m;
      this.meal.key = this.mealId;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
