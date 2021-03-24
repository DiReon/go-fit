import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Training } from 'src/app/shared/models/training';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {
  training = {} as Training;
  trainingId: string;
  categories$;
  uploadIsValid = true;
  constructor(
    private trainingService: SharedService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trainingId = this.route.snapshot.paramMap.get('id');
    if (this.trainingId) this.trainingService.get('trainings', this.trainingId).valueChanges().pipe(take(1)).subscribe(t => {
      this.training = t;
      console.log("this training in quiz form:", this.training);
      
    });
    this.categories$ = this.categoryService.getAll().snapshotChanges();
  }

  ngOnInit(): void {}

  onUploadFile(url) {
    this.training.thumbnailUrl = url;
    console.log("Emitted url:", url);
    
  }

  uploadValidTrigger(value: boolean) {
    console.log("Received ", value);
    this.uploadIsValid = value;
  }


  save(value) {
    
    this.training.title = value.title;
    this.training.category = value.category;
    this.training.description = value.description;
    this.training.videoUrl = value.videoUrl;
    this.training.complexity = value.complexity;

    if (this.trainingId) this.trainingService.update('trainings', this.trainingId, this.training)
    else this.trainingService.create('trainings', this.training);

    this.router.navigate(['/admin/trainings']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить тренировку?')) return;
    
    this.trainingService.delete('trainings', this.trainingId);
    this.router.navigate(['/admin/trainings']);
    
  }

}
