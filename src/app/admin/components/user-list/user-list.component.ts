import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: AppUser[];
  currentMonth: string;
  nextMonth: string;
  monthArr = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  subscription: Subscription;
  constructor(private userService: UserService) {
    this.subscription = this.userService.getAll().valueChanges().subscribe(u => {this.users = u})
    let date = new Date();
    this.currentMonth = this.monthArr[date.getMonth()] + "_" + date.getFullYear().toString();
    let y = 0;
    if (date.getMonth() == 11) y = 1;
    this.nextMonth = this.monthArr[date.getMonth() - 1] + "_" + (date.getFullYear() + y).toString();
    
  }

  ngOnInit(): void {
  }

  isMonthActive(user, month) {
    if (user.activeMonth && user.activeMonth != null) return (user.activeMonth.indexOf(month) != -1);
    return false; 
  }

  addMonth(user: AppUser, month) {
    user.activeMonth ? user.activeMonth.push(month) : user.activeMonth = [month];
    this.userService.addActiveMonth(user.userId, user.activeMonth);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
