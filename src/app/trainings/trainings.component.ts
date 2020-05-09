import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent {

  categories$;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges()
  }


}
