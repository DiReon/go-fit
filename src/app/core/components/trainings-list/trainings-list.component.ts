import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  trainingsTemp: Training[];
  appUser: AppUser;
  completedKeys = [];
  subscription: Subscription;
  icon = faCheckSquare;
  trialDays: number;
  noTrainings = false;
  constructor(
    private route: ActivatedRoute,
    private trainingService: SharedService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    let trainings$: Observable<Training[]>;
    trainings$ = (this.category == 'all') ? this.trainingService.getAll('trainings') : this.trainingService
      .getFromCategory(this.category);
    let date = new Date();
    let monthArr = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let currentMonth = monthArr[date.getMonth()] + "_" + date.getFullYear().toString();
    console.log(`Current month: ${currentMonth}`);

    this.subscription = trainings$.pipe(switchMap(t => {
      this.trainingsTemp = t;
      return this.authService.appUser$;
    })).subscribe(u => {
      this.appUser = u;
      console.log(this.appUser);
      let ct = [];
      if (u) ct = this.appUser.completedTrainings;
      this.completedKeys = ct ? Object.values(ct): [];
      console.log("Completed training keys", this.completedKeys);
      if (this.appUser.activeMonth) {
        this.trainings = this.trainingsTemp.filter(t => this.appUser.activeMonth.indexOf(t.period) != -1);
        if (this.appUser.activeMonth.indexOf(currentMonth) != -1) this.trainings = this.trainingsTemp;
      } else this.trainings = null;
      console.log("Registration date: ", this.appUser.registrationDate);
      let today = new Date().getTime();
      this.trialDays = Math.round((3 - (today - (+this.appUser.registrationDate))/24/3600/1000));
      if (this.trialDays >= 0) this.trainings = this.trainingsTemp;
      if (this.trialDays >= 1) this.openSnackBar(`Дней до окончания пробного периода: ${this.trialDays}`, "OK")
      if (this.trialDays == 0) this.openSnackBar(`Последний день пробного периода!`, "OK")
      console.log("All trainings: ", this.trainings);
      if (!this.trainings || !this.trainings.length) this.noTrainings = true;
    })
  }

  checkCompletion(training) {
    return (this.completedKeys.indexOf(training['key'])!=-1) ? true: false
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
