import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  meal$;
  mealId
  constructor(
    private mealService: SharedService,
    private route: ActivatedRoute,
  ) { 
    this.mealId = this.route.snapshot.paramMap.get('mealId')
    this.meal$ = mealService.get('meals', this.mealId).valueChanges();
  }

  ngOnInit(): void {
  }

}
