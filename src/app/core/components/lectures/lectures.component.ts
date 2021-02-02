import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Lecture } from 'src/app/shared/models/lecture';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LectureService } from 'src/app/shared/services/lecture.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
  lectures: Lecture[];
  appUser: AppUser;
  completedKeys = [];
  subscription: Subscription;
  authSubscription: Subscription;
  icon = faCheckSquare;
  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.lectureService.getAll().subscribe(t => this.lectures = t)
    this.authSubscription = this.authService.appUser$.subscribe(u => {
      this.appUser = u;
      let ct = [];
      if (u) ct = this.appUser.completedLectures;
      this.completedKeys = ct ? Object.values(ct): [];
      console.log("Completed lecture keys", this.completedKeys);
      console.log("All lectures: ", this.lectures);
    })
  }

  checkCompletion(lecture) {
    return (this.completedKeys.indexOf(lecture['key'])!=-1) ? true: false
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
