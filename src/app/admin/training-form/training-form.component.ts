import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/training.service';
import { Training } from 'src/app/models/training';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {
  training = {} as Training;
  trainingId: string;
  constructor(private trainingService: TrainingService,
              private route: ActivatedRoute,
              private router: Router) {
    this.trainingId = this.route.snapshot.paramMap.get('id')
    if (this.trainingId) this.trainingService.get(this.trainingId).valueChanges().pipe(take(1)).subscribe(t => this.training = t)
  }

  ngOnInit(): void {
  }

  save(value) {
    this.trainingService.create(value);
    this.router.navigate(['/admin/trainings'])

  }

}
