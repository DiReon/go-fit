import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { Lecture } from 'src/app/shared/models/lecture';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LectureService } from 'src/app/shared/services/lecture.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent implements OnInit {
  lecture = {} as Lecture;
  lectureId: string;
  videoId: string;
  lectureSubscription: Subscription;
  appUser: AppUser;

  constructor(
    private lectureService: LectureService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.lectureId = this.route.snapshot.paramMap.get('lectureId');
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u);
    
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
    this.lectureSubscription = this.lectureService.get(this.lectureId).valueChanges().subscribe(t => {
      this.lecture = t;
      this.videoId = this.lecture.videoUrl.split('https://youtu.be/')[1];
    })
  }
  
  markCompleted() {
    this.userService.markLectureCompleted(this.appUser.userId, this.lectureId);
    this.router.navigate(['/lectures'])
  }

  ngOnDestroy() {
    this.lectureSubscription.unsubscribe();
  }
}
