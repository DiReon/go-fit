import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { AppUser } from '../models/app-user';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  meals: Meal[];
  appUser: AppUser;
  temp = [];
  category: string;
  constructor(
    private mealService: MealService, 
    private route: ActivatedRoute,
  ) {
    this.mealService.getAll().pipe(
      switchMap(meals => {
        this.temp = this.meals = meals;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      }
    )
  }

  ngOnInit() {
  }

  private applyFilter() {
    this.meals = (this.category) ?
      this.temp.filter(m => m.category === this.category):
      this.temp;
  }
}
