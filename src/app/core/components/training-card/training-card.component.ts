import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  icon = faCheckCircle;
  isListCollapsed = true;
  trainings: Training[];
  training ={} as Training;
  completedTKeys: string[] = [];
  incompleteTs: Training[] = [];
  category: string;
  videoId: string;
  subscription: Subscription;
  appUser: AppUser;

  constructor(
    private trainingService: TrainingService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    console.log("Category: ", this.category);
    this.loadTraining();
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
  }
  
  loadTraining() {
    console.log("loadTraining started");
    this.subscription = this.authService.appUser$.pipe(switchMap(u => {
      this.appUser = u;
      let ct = [];
      if (u) ct = this.appUser.completedTrainings;
      this.completedTKeys = ct? Object.values(ct): [];
      console.log("Completed training keys", this.completedTKeys);
      return this.trainingService.getFromCategory(this.category)
    }))
      .subscribe(t => {
        this.trainings = t.sort((a, b) => (a.title>b.title) ? 1 : -1 );
        console.log("All trainings: ", this.trainings);
        this.incompleteTs = this.trainings.filter(x => (!(this.completedTKeys.includes(x['key']))));
        console.log("Incomplete trainings: ", this.incompleteTs);
        this.training = (this.incompleteTs[0]) ? this.incompleteTs[0] :this.trainings[this.trainings.length-1]
        console.log("This training: ", this.training);
        
        this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
      })
  
  
  }

  markCompleted() {
    this.authService.markCompleted(this.training['key']);
  }

  change(change) {
    let index = this.trainings.indexOf(this.training)
    if (index+change>=0 && index+change < this.trainings.length ) this.training = this.trainings[index+change];
    this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
  }

  checkCompletion(training) {
    return (this.completedTKeys.indexOf(training['key'])!=-1) ? true: false
  }

  pickTraining(training) {
    this.training = training;
    console.log("Training picked: ", training);
    
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
