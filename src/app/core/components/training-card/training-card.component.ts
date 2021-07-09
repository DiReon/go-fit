import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserComment } from 'src/app/shared/models/user-comment';
import { UserService } from 'src/app/shared/services/user.service';

import { AppUser } from '../../../shared/models/app-user';
import { Training } from '../../../shared/models/training';
import { AuthService } from '../../../shared/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  training = {} as Training;
  category: string;
  trainingId: string;
  videoId: string;
  trainingSubscription: Subscription;
  appUser: AppUser;
  videoWidth = 1280;
  videoHeight = 720;
  comments: UserComment[];
  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.trainingId = this.route.snapshot.paramMap.get('trainingId');
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u);
    console.log("Category: ", this.category);
    
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
      
    this.trainingSubscription = this.sharedService.get('trainings', this.trainingId).valueChanges().subscribe(t => {
      this.training = t;
      this.training.key = this.trainingId;
      
      this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
    })
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  markCompleted() {
    this.userService.markTrainingCompleted(this.appUser.userId, this.trainingId, this.training.title);
    this.router.navigate(['/trainings', this.category])
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    if (this.demoYouTubePlayer.nativeElement) {
      this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1280);
      this.videoHeight = this.videoWidth * 9/16;
      this._changeDetectorRef.detectChanges();
    }
  }

}
