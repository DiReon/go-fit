import { Component } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "go-fit"
  constructor(private sharedService: SharedService) {
    console.log("Hello world!");
        
  }
}
