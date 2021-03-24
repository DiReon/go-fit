import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { Lecture } from 'src/app/shared/models/lecture';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-meditation-card',
  templateUrl: './meditation-card.component.html',
  styleUrls: ['./meditation-card.component.css']
})
export class MeditationCardComponent implements OnInit {
  meditation = {} as Lecture;
  meditationId: string;
  videoId: string;
  meditationSubscription: Subscription;
  appUser: AppUser;

  constructor(
    private lectureService: SharedService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.meditationId = this.route.snapshot.paramMap.get('lectureId');
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u);
    
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
    this.meditationSubscription = this.lectureService.get('meditation', this.meditationId).valueChanges().subscribe(t => {
      this.meditation = t;
      this.videoId = this.meditation.videoUrl.split('https://youtu.be/')[1];
    })
  }
  
  ngOnDestroy() {
    this.meditationSubscription.unsubscribe();
  }

}
