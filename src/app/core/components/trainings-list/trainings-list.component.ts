import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Training } from 'src/app/shared/models/training';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TrainingService } from 'src/app/shared/services/training.service';

@Component({
  selector: 'trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  category: string;
  trainings: Training[];
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.subscription = this.trainingService.getFromCategory(this.category).subscribe(t => this.trainings = t)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
