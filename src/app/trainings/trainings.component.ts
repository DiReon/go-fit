import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Training } from '../models/training';
import { filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings: Training[];
  training = {} as Training;
  completedTrainingsKeys: Array<string>;
  incompleteTrainings: Training[];
  videoId: string = '';
  constructor(
    private trainingService: TrainingService,
    private authService: AuthService,
    ) {
    
       this.authService.getCompletedTrainings().pipe(take(1)).subscribe(t => {
        console.log("Completed trainings from firebase: ", t);
        
        if (t != null) this.completedTrainingsKeys = Object.values(t);
        else this.completedTrainingsKeys = [];
        console.log("Completed trainings keys from firebase: ", this.completedTrainingsKeys);
        this.trainingService.getAll().pipe(
          take(1))
          .subscribe(allT => {
            this.trainings = allT;

            if (this.completedTrainingsKeys === null) this.completedTrainingsKeys = [];
            console.log("Trainings: ", this.trainings);
            console.log("Completed trainings: ", this.completedTrainingsKeys);
            let trainingKeys = this.trainings.map(x => x['key'])
            console.log("Training keys: ", trainingKeys);
            this.incompleteTrainings = this.trainings.filter(x => (!(this.completedTrainingsKeys.includes(x['key']))))
            console.log("Incomplete trainings: ", this.incompleteTrainings);
            this.training = this.incompleteTrainings[0]
            console.log("First incomplete training", this.training);
            this.videoId = this.training.videoUrl.split('https://youtu.be/')[1];
          });
      });
    }
   
  

  async ngOnInit() {
   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);  
  }
  
  markCompleted() {
    this.authService.markCompleted(this.training['key'])
  }
  
}
