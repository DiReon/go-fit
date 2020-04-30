import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/training.service';
import { Subscription } from 'rxjs';
import { AngularFireList } from '@angular/fire/database/database';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.css']
})
export class AdminTrainingsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  rowsRef: AngularFireList<any>;
  temp = [];
  ColumnMode = ColumnMode;  

  constructor(private trainingService: TrainingService) { 
   
    this.subscription = this.trainingService.getAll()
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
