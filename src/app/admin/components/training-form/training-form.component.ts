import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Training } from 'src/app/shared/models/training';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TrainingService } from 'src/app/shared/services/training.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {
  training = {} as Training;
  trainingId: string;
  categories$;
  constructor(
    private trainingService: TrainingService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trainingId = this.route.snapshot.paramMap.get('id');
    if (this.trainingId) this.trainingService.get(this.trainingId).valueChanges().pipe(take(1)).subscribe(t => this.training = t);
    this.categories$ = this.categoryService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

  save(value) {
    if (this.trainingId) this.trainingService.update(this.trainingId, value)
    else this.trainingService.create(value);
    this.router.navigate(['/admin/trainings'])
  }
  
  delete() {
    if (!confirm('Точно хотите удалить тренировку?')) return;
    
    this.trainingService.delete(this.trainingId);
    this.router.navigate(['/admin/trainings']);
    
  }

}
