import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Lecture } from 'src/app/shared/models/lecture';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-meditation-form',
  templateUrl: './meditation-form.component.html',
  styleUrls: ['./meditation-form.component.css']
})
export class MeditationFormComponent implements OnInit {
  meditation = {} as Lecture;
  meditationId: string;
  uploadIsValid = true;
  constructor(
    private meditationService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.meditationId = this.route.snapshot.paramMap.get('id');
    if (this.meditationId) this.meditationService.get('meditations', this.meditationId).valueChanges().pipe(take(1))
      .subscribe(t => this.meditation = t);
    }

  ngOnInit(): void {}

  onUploadFile(url) {
    this.meditation.thumbnailUrl = url;
  }

  uploadValidTrigger(value: boolean) {
    this.uploadIsValid = value;
  }


  save(value) {
    
    this.meditation.title = value.title;
    this.meditation.description = value.description;
    this.meditation.videoUrl = value.videoUrl;

    if (this.meditationId) this.meditationService.update('meditations', this.meditationId, this.meditation)
    else this.meditationService.create('meditations', this.meditation);

    this.router.navigate(['/admin/meditations']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить медитацию?')) return;
    
    this.meditationService.delete('meditations', this.meditationId);
    this.router.navigate(['/admin/meditations']);
    
  }
}
