import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Lecture } from 'src/app/shared/models/lecture';
import { LectureService } from 'src/app/shared/services/lecture.service';

@Component({
  selector: 'app-lecture-form',
  templateUrl: './lecture-form.component.html',
  styleUrls: ['./lecture-form.component.css']
})
export class LectureFormComponent implements OnInit {
  lecture = {} as Lecture;
  lectureId: string;
  categories$;
  uploadIsValid = true;
  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.lectureId = this.route.snapshot.paramMap.get('id');
    if (this.lectureId) this.lectureService.get(this.lectureId).valueChanges().pipe(take(1))
      .subscribe(t => this.lecture = t);
    }

  ngOnInit(): void {}

  onUploadFile(url) {
    this.lecture.thumbnailUrl = url;
  }

  uploadValidTrigger(value: boolean) {
    this.uploadIsValid = value;
  }


  save(value) {
    
    this.lecture.title = value.title;
    this.lecture.description = value.description;
    this.lecture.videoUrl = value.videoUrl;

    if (this.lectureId) this.lectureService.update(this.lectureId, this.lecture)
    else this.lectureService.create(this.lecture);

    this.router.navigate(['/admin/lectures']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить тренировку?')) return;
    
    this.lectureService.delete(this.lectureId);
    this.router.navigate(['/admin/lectures']);
    
  }

}
