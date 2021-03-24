import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Lecture } from 'src/app/shared/models/lecture';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-meditations',
  templateUrl: './meditations.component.html',
  styleUrls: ['./meditations.component.css']
})
export class MeditationsComponent implements OnInit {
  meditations: Lecture[];
  appUser: AppUser;
  subscription: Subscription;
  authSubscription: Subscription;
  icon = faCheckSquare;
  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.getAll('meditations').subscribe(t => this.meditations = t)
    this.authSubscription = this.authService.appUser$.subscribe(u => {
      this.appUser = u;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
