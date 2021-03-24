import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-admin-meditations',
  templateUrl: './admin-meditations.component.html',
  styleUrls: ['./admin-meditations.component.css']
})
export class AdminMeditationsComponent implements OnInit {
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  rowsRef: AngularFireList<any>;
  temp = [];
  ColumnMode = ColumnMode;  

  constructor(private meditationService: SharedService) { 
   
    this.subscription = this.meditationService.getAll('meditations')
      .subscribe(response => this.rows = this.temp = response)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  filter(query) {
    this.rows = (query) ?
      this.temp.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.temp;
  }

}
