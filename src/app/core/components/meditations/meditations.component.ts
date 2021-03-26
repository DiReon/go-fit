import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class MeditationsComponent implements OnInit, OnDestroy {
  meditations: Lecture[];
  subscription: Subscription;
  constructor(
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.getAll('meditations').subscribe(t => this.meditations = t)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
