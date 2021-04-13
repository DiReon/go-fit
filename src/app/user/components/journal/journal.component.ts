import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { MyRecord } from 'src/app/shared/models/my-record';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  appUser: AppUser;
  weight: number;
  showActions = true;
  date: string;
  subscription: Subscription;
  kkal: number;
  steps: number;
  trainingTitles: string[];
  activity: string;
  day: number;
  month: number
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { 
    this.day = +this.route.snapshot.queryParamMap.get('day');
    this.month = +this.route.snapshot.queryParamMap.get('month');
    console.log(`Date: ${this.day}/${this.month}`);
    
    this.subscription = this.authService.appUser$.subscribe( u => {
      if (u) {
        if (!u.name) this.router.navigate(['user-profile']);
        let dateObj = new Date();
        if (this.day && this.month) {
          this.date = formatDate(`${dateObj.getFullYear()}-${this.month+1}-${this.day}`, 'yyyy-MM-dd', 'en');
        } else this.date = formatDate(dateObj, 'yyyy-MM-dd', 'en');
        this.appUser = new AppUser(u);
        this.load();
      };
    })
  }

  ngOnInit() {}

  load() {
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
    console.log(this.kkal = this.steps = this.weight = this.activity = null)
    if (this.appUser.journal && this.appUser.journal!=null) {
      console.log("Journal: ", this.appUser.journal);
      console.log(Object.values(this.appUser.journal));
      let record = Object.values(this.appUser.journal).filter(r => r.date == this.date)[0];
      console.log("Date from form: ", this.date);
      
      if (record) {
        this.kkal = record.kkal || null;
        this.steps = record.steps || null;
        this.weight = record.weight || null;
        this.trainingTitles = record.trainingTitles ? Object.values(record.trainingTitles) : [];
        this.activity = record.activity || null;
        console.log("Record: ", record);
      }
    }
  }

  save(value: Partial<MyRecord>) {
    let date = new Date().getTime();
    value.dateRecorded = date;
    console.log("Form value: ", value);
    console.log(this.appUser);
    value.isKkalInRange = (value['kkal'] && value['kkal'] != null) ? this.isKkalInRange(value['kkal']) : false;
    console.log(`is kkal in range? ${value.isKkalInRange}`);

    if (this.appUser.userId) this.userService.addToJournal(this.appUser.userId, value)
  }

  isKkalInRange(kkal) {
    let result = false;
    let target = this.appUser.kkalTarget;
    switch (this.appUser.goal) {
      case 'gain':
        if (kkal >= target) result = true;
        break;
      case 'lose':
        if (kkal <= target) result = true;
        break;
      case 'maintain':
        if (kkal <= target*1.1 && kkal >= target*0.9) result = true;
        break;
    }
    return result;
  }

  openSnackBar() {
    this._snackBar.open("Запись сохранена", "OK", {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
