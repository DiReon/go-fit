import { Component, Input, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {
  @Input("type") type: string;  
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  
  constructor(private sharedService: SharedService) { 
  }

  ngOnInit(): void {
    
    if (this.type) this.subscription = this.sharedService.getAll(this.type)
      .subscribe(
        response => {
          this.rows = this.temp = response;
      })
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
