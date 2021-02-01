import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { Meal } from 'src/app/shared/models/meal';
import { MealService } from 'src/app/shared/services/meal.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  meals: Meal[];
  appUser: AppUser;
  temp = [];
  category: string;
  constructor(
    private mealService: MealService, 
    private route: ActivatedRoute,
  ) {
    this.mealService.getAll().subscribe(m => this.meals = m);
    // this.mealService.getAll().pipe(
    //   switchMap(meals => {
    //     this.temp = this.meals = meals;
    //     return this.route.queryParamMap;
    //   }))
    //   .subscribe(params => {
    //     this.category = params.get('category');
    //     this.applyFilter();
    //   }
    // )
  }

  ngOnInit() {
  }

  private applyFilter() {
    this.meals = (this.category) ?
      this.temp.filter(m => m.category === this.category):
      this.temp;
  }

}
