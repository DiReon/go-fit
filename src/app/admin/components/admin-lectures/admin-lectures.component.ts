import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { LectureService } from 'src/app/shared/services/lecture.service';

@Component({
  selector: 'app-admin-lectures',
  templateUrl: './admin-lectures.component.html',
  styleUrls: ['./admin-lectures.component.css']
})
export class AdminLecturesComponent implements OnInit {
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  rowsRef: AngularFireList<any>;
  temp = [];
  ColumnMode = ColumnMode;  

  constructor(private lectureService: LectureService) { 
   
    this.subscription = this.lectureService.getAll()
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
