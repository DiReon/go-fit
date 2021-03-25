import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit, OnDestroy {
  type: string;
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(r => {
      this.type = r['type'];
      console.log("Type: ", this.type);
    }
    )
  }

  ngOnInit(): void {
      this.subscription = this.route.params.pipe(switchMap(params => {
        this.type = params['type']
        return this.sharedService.getAll(this.type)
      })).subscribe(
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
