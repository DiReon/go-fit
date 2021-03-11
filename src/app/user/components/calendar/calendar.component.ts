import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/shared/models/app-user';
import { MyRecord } from 'src/app/shared/models/my-record';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  appUser: AppUser;
  days = [];
  date: Date;
  month: number;
  year: number;
  previousMonth: string;
  currentMonth: string;
  nextMonth: string;
  extraDays = [];
  monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  constructor(
    private authService: AuthService,
    private router: Router,

  ) { 
    this.authService.appUser$.subscribe(u => {
      this.appUser = new AppUser(u);
      this.date = new Date();
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.loadMonth(0);
    })
  }

  ngOnInit(): void {
  }

  setMonth(value: number) {
    console.log("number of days in the month: ", value);
    let j = 35 - value;
    console.log("j: ", j);
    this.extraDays = [];
    for (let i = 1; i < j+1; i++) {
      this.extraDays.push(i);
      console.log(i);
      
    }
    console.log(`extra days: ${this.extraDays}`);
    
    for (let index = 1; index < value + 1; index++) {
      let dateForm = formatDate(new Date(this.year, this.month, index), 'yyyy-MM-dd', 'en');
      console.log(dateForm);
      
      let emptyDay: MyRecord = {
        date: dateForm,
        dateRecorded: null,
        kkal: null,
        steps: 1000,
        trainingTitles: ['qwerty'],
        trainingId: [],
        weight: null,
        proofUrl: null
      };
      this.days.push(emptyDay);
    }
  }

  clearMonth() {
    this.days = [];
  }

  loadMonth(value: number) {
    this.clearMonth();
    if (value < 0 && this.month < 1) { 
      this.month = 11;
      this.year -= 1; 
    }
    else if (value > 0 && this.month > 10) { 
      this.month = 0;
      this.year += 1;
    }
    else { this.month += value; }
    
    this.previousMonth = (this.month < 1) ? this.monthNames[11] : this.monthNames[this.month - 1];
    this.currentMonth = this.monthNames[this.month];
    this.nextMonth = (this.month > 10) ? this.monthNames[0] : this.monthNames[this.month + 1];
     
    console.log("this.month+1: ", this.month+1);
    
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(this.month+1) != -1)  { 
      console.log("this.month set to: ", (this.month + 1));
      this.setMonth(31);
    } 
    else if ([4, 6, 9, 11].indexOf(this.month+1) != -1) { this.setMonth(30) }
    else if  (this.month + 1 == 2) { this.setMonth((this.date.getFullYear() % 4 === 0) ? 29 : 28); };
    
    let journal = (this.appUser.journal) ? Object.values(this.appUser.journal) : [];
    console.log('Journal', journal);
    
    this.days.forEach(d => {
      let record = journal.filter(r => r.date == d.date)[0];
      
      if (record) {
        d.kkal = record.kkal;
        d.steps = record.steps;
        d.weight = record.weight;
        d.trainingTitles = record.trainingTitles ? Object.values(record.trainingTitles) : [];
        d.kkalIsGood = (d.kkal <= this.appUser.kkalTarget);
        d.stepsIsGood = (d.steps >= 8000);
        
      } else d.kkal = d.steps = d.weight = d.trainingTitles= null;
    })
  }

  goToJournal(day) {
    this.router.navigate(['/journal/'], {queryParams: {month: this.month, day: day}});
  }

}
