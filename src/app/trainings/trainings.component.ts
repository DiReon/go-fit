import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Training } from '../models/training';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit, OnDestroy {
  trainings: Training[];
  training ={} as Training;
  completedTrKeys: Array<string> = [];
  incompleteTr: Training[] = [];
  videoId: string = '';
  subscription: Subscription;
  appUser: AppUser;
  id: string;
  constructor(
    private trainingService: TrainingService,
    private authService: AuthService,
    private sharedService: SharedService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    // this.id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.loadTraining();
    })
    

    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
  }
  
  loadTraining() {
    this.subscription = this.authService.getCompletedTrainings().subscribe(t => {
      (t != null) ? this.completedTrKeys = Object.values(t) : this.completedTrKeys = [];
      this.trainingService.getAll().pipe(take(1)).subscribe(allT => {
          this.trainings = allT;
          console.log("all trainings: ", this.trainings);
          
          if (this.completedTrKeys === null) this.completedTrKeys = [];
          this.incompleteTr = this.trainings.filter(x => (!(this.completedTrKeys.includes(x['key']))));
          if (this.id) {
            console.log("This id:", this.id);
            let trainingKeys = Object.values(this.trainings);
            console.log("Training keys:", trainingKeys);
            this.training = this.trainings.filter(x => (x['key'] === this.id))[0];
            console.log("Training selected by Url params: ", this.training);
          }
          else (this.incompleteTr[0]) ? this.training = this.incompleteTr[0] :  this.training = this.trainings[this.trainings.length-1]
          this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
        });
    });
  }

  markCompleted() {
    this.authService.markCompleted(this.training['key']);
  }

  change(change) {
    let index = this.trainings.indexOf(this.training)
    if (index+change>=0 && index+change < this.trainings.length ) this.training = this.trainings[index+change];
    this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
