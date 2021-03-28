import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { Training } from 'src/app/shared/models/training';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  icon = faCheckSquare;
  constructor(
    private route: ActivatedRoute,
    private trainingService: SharedService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    let trainings$: Observable<Training[]>;
    trainings$ = (this.category == 'all') ? this.trainingService.getAll('trainings') : this.trainingService
      .getFromCategory(this.category)
    
    this.subscription = trainings$.pipe(switchMap(t => {
      this.trainings = t;
      return this.authService.appUser$;
    })).subscribe(u => {
      this.appUser = u;
      console.log(this.appUser);
      let ct = [];
      if (u) ct = this.appUser.completedTrainings;
      this.completedKeys = ct ? Object.values(ct): [];
      console.log("Completed training keys", this.completedKeys);
      if (this.appUser.activeMonth) {
        this.trainings = this.trainings.filter(t => this.appUser.activeMonth.indexOf(t.period) != -1);
      } else this.trainings = null;
      console.log("All trainings: ", this.trainings);
    })
  }

  getTrainings() {

  }

  checkCompletion(training) {
    return (this.completedKeys.indexOf(training['key'])!=-1) ? true: false
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
