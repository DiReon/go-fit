import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Lecture } from 'src/app/shared/models/lecture';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  urls = [];
  constructor(
    private lectureService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.lectureId = this.route.snapshot.paramMap.get('id');
    if (this.lectureId) this.lectureService.get('lectures', this.lectureId).valueChanges().pipe(take(1))
      .subscribe(t => {
        this.lecture = t;
        this.urls.push(this.lecture.thumbnailUrl);
      });
    }

  ngOnInit(): void {}

  onUploadFile(urls) {
    this.lecture.thumbnailUrl = urls[0];
  }

  uploadValidTrigger(value: boolean) {
    this.uploadIsValid = value;
  }


  save(value) {
    
    this.lecture.title = value.title;
    this.lecture.description = value.description;
    this.lecture.videoUrl = value.videoUrl;

    if (this.lectureId) this.lectureService.update('lectures', this.lectureId, this.lecture)
    else this.lectureService.create('lectures', this.lecture);

    this.router.navigate(['/admin/lectures']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить лекцию?')) return;
    
    this.lectureService.delete('lectures', this.lectureId);
    this.router.navigate(['/admin/lectures']);
    
  }

}
