import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

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
      // this.weightArray = this.appUser.lastWeightRecord;
      console.log(this.weightArray);
      
    })
  }

  ngOnInit(): void {
  }

}
