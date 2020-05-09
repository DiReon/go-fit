import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  appUser: AppUser;
  weightArray: [{}];
  // user$: Observable<AppUser>;
  constructor(private authService: AuthService) {
    // this.user$ = this.authService.appUser$
    this.authService.appUser$.pipe(take(1)).subscribe(u =>{
      this.appUser = new AppUser(u);
      console.log("User data: ", this.appUser);
      this.weightArray = this.appUser.weight
      console.log(this.weightArray);
      
    })
  }

  ngOnInit(): void {
  }

}
