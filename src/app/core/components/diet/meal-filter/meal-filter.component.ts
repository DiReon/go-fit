import { Component, OnInit, Input } from '@angular/core';
import { MealCategories } from 'src/app/shared/models/meal-categories';


@Component({
  selector: 'meal-filter',
  templateUrl: './meal-filter.component.html',
  styleUrls: ['./meal-filter.component.css']
})
export class MealFilterComponent implements OnInit {
  categories = MealCategories;
  @Input("category") category: string;
  constructor() { }

  ngOnInit(): void {
  }

}
