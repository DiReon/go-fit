import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

import { AppUser } from '../../../shared/models/app-user';
import { Training } from '../../../shared/models/training';
import { AuthService } from '../../../shared/services/auth.service';
import { TrainingService } from '../../../shared/services/training.service';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit {
  training = {} as Training;
  category: string;
  trainingId: string;
  videoId: string;
  trainingSubscription: Subscription;
  appUser: AppUser;

  constructor(
    private trainingService: TrainingService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.trainingSubscription = this.trainingService.get(this.trainingId).valueChanges().subscribe(t => {
      this.training = t;
      this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
    })
  }
  
  markCompleted() {
    this.userService.markTrainingCompleted(this.appUser.userId, this.trainingId);
    this.router.navigate(['/trainings', this.category])
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

}
