import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Training } from 'src/app/shared/models/training';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TrainingService } from 'src/app/shared/services/training.service';

@Component({
  selector: 'trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  category: string;
  trainings: Training[];
  appUser: AppUser;
  completedKeys = [];
  subscription: Subscription;
  authSubscription: Subscription;
  icon = faCheckSquare;
  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.subscription = this.trainingService.getFromCategory(this.category).subscribe(t => this.trainings = t)
    this.authSubscription = this.authService.appUser$.subscribe(u => {
      this.appUser = u;
      let ct = [];
      if (u) ct = this.appUser.completedTrainings;
      this.completedKeys = ct ? Object.values(ct): [];
      console.log("Completed training keys", this.completedKeys);
      console.log("All trainings: ", this.trainings);
    })
  }

  checkCompletion(training) {
    return (this.completedKeys.indexOf(training['key'])!=-1) ? true: false
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
