import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Meal } from 'src/app/shared/models/meal';
import { MealService } from 'src/app/shared/services/meal.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {
  meal = {} as Meal;
  mealId: string;
  categories = ['breakfast', 'lunch', 'dinner', 'snack'];
  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mealId = this.route.snapshot.paramMap.get('id');
    if (this.mealId) this.mealService.get(this.mealId).valueChanges().pipe(take(1)).subscribe(t => this.meal = t);
  }

  ngOnInit(): void {
  }

  save(value) {
    if (this.mealId) this.mealService.update(this.mealId, value)
    else this.mealService.create(value);
    this.router.navigate(['/admin/diet'])
  }
  
  delete() {
    if (!confirm('Точно хотите удалить блюдо?')) return;
    
    this.mealService.delete(this.mealId);
    this.router.navigate(['/admin/meals']);
    
  }


}
