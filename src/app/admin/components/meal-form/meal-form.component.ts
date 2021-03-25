import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Meal } from 'src/app/shared/models/meal';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {
  meal = {} as Meal;
  mealId: string;
  uploadIsValid = true;
  constructor(
    private mealService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mealId = this.route.snapshot.paramMap.get('id');
    if (this.mealId) this.mealService.get('meals', this.mealId).valueChanges().pipe(take(1)).subscribe(t => this.meal = t);
  }

  ngOnInit(): void {
  }
  
  onUploadFile(url) {
    this.meal.imageUrl = url;
    console.log("Emitted url:", url);
    
  }

  uploadValidTrigger(value: boolean) {
    console.log("Received ", value);
    this.uploadIsValid = value;
  }

  save(value) {
    this.meal.description = value.description;
    this.meal.recipe = value.recipe;
    this.meal.title = value.title;
    if (this.mealId) this.mealService.update('meals', this.mealId, this.meal)
    else this.mealService.create('meals', value);
    this.router.navigate(['/admin/diet'])
  }
  
  delete() {
    if (!confirm('Точно хотите удалить блюдо?')) return;
    
    this.mealService.delete('meals', this.mealId);
    this.router.navigate(['/admin/diet']);
    
  }


}
