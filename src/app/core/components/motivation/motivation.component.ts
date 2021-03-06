import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit, OnDestroy {
  urls: string[];
  subscription: Subscription;
  constructor(
      private sharedService: SharedService,
    ) { 
      this.subscription = this.sharedService.getListOfAll('motivation').subscribe(
        response => {
          this.urls = Object.values(response).reverse();
          console.log("Motivations: ", response);
          console.log("Motivations: ", this.urls);
        }
      );
    };

    ngOnInit(): void {
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
