import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-admin-motivation',
  templateUrl: './admin-motivation.component.html',
  styleUrls: ['./admin-motivation.component.css']
})
export class AdminMotivationComponent implements OnInit, OnDestroy {
  urls: string[];
  uploadIsValid = true;  
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
    onUploadFile(urlsArr) {
      urlsArr.forEach(url => {
        this.urls.push(url);
        this.sharedService.setContent('motivation', url)
      });
    }

    uploadValidTrigger(value: boolean) {
      this.uploadIsValid = value;
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
