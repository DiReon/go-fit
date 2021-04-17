import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { Lecture } from 'src/app/shared/models/lecture';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  lecture = {} as Lecture;
  lectureId: string;
  videoId: string;
  lectureSubscription: Subscription;
  appUser: AppUser;
  videoWidth = 1280;
  videoHeight = 720;

  constructor(
    private lectureService: SharedService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.lectureId = this.route.snapshot.paramMap.get('lectureId');
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u);
    
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
    this.lectureSubscription = this.lectureService.get('lectures', this.lectureId).valueChanges().subscribe(t => {
      this.lecture = t;
      this.videoId = this.lecture.videoUrl.split('https://youtu.be/')[1];
    })
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }
  
  markCompleted() {
    this.userService.markLectureCompleted(this.appUser.userId, this.lectureId);
    this.router.navigate(['/lectures'])
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    if (this.demoYouTubePlayer.nativeElement) {
      this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1280);
      this.videoHeight = this.videoWidth * 9/16;
      this._changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.lectureSubscription.unsubscribe();
    window.removeEventListener('resize', this.onResize);
  }
}