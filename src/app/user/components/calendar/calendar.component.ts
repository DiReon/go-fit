import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  days: MyRecord[] = [];
  date: Date;
  month: number
  constructor(
    private authService: AuthService,
    private userService: UserService,

  ) { 
    this.authService.appUser$.subscribe(u => {
      this.appUser = new AppUser(u);
      this.date = new Date();
      this.month = this.date.getMonth()-1;
      console.log(this.month);
      
      switch (this.month+1) {
        case 1 || 3 || 5 || 7 || 8 || 10 || 12:
        this.setMonth(31);  
          break;
        case 4 || 6 || 9 || 11:
          this.setMonth(30);
          break;
        case 2:
          this.setMonth((this.date.getFullYear() % 4 === 0) ? 29 : 28);
          break;
      }
      console.table(this.appUser);
      
      console.log('this.appUser.journal', this.appUser.journal);
      
      let journal = (this.appUser.journal) ? Object.values(this.appUser.journal) : [];
      console.log('Journal', journal);
      
      this.days.forEach(d => {
        let record = journal.filter(r => r.date == d.date)[0];
        console.log('Record: ', record);
        
        if (record) {
          d.kkal = record.kkal;
          d.steps = record.steps;
          d.weight = record.weight;
          d.trainingTitles = record.trainingTitles;
        } else d.kkal = d.steps = d.weight = d.trainingTitles= null
      })

    })
  }

  ngOnInit(): void {
  }

  setMonth(value) {
    for (let index = 1; index < value+1; index++) {
      let dateForm = formatDate(new Date(this.date.getFullYear(), this.month, index), 'yyyy-MM-dd', 'en');
      
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

}
