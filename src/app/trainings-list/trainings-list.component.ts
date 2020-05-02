import { Component, OnInit, Input } from '@angular/core';
import { Training } from '../models/training';
import { CategoryService } from '../category.service';

@Component({
  selector: 'trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  @Input("trainings") trainings: Training[];
  @Input("incompleteTr") incompleteTr: Array<string>;
  @Input("completedTrKeys") completedTrKeys: Array<string>;
  public isListCollapsed = true;
  categories$;
  constructor(private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getAll().valueChanges()
  }

  ngOnInit(): void {
  }

  checkCompletion(training) {
    return (this.completedTrKeys.indexOf(training['key'])!=-1) ? true: false
  }
}
