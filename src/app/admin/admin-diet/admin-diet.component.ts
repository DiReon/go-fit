import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { AngularFireList } from '@angular/fire/database';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MealService } from 'src/app/meal.service';

@Component({
  selector: 'app-diet',
  templateUrl: './admin-diet.component.html',
  styleUrls: ['./admin-diet.component.css']
})
export class AdminDietComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  rowsRef: AngularFireList<any>;
  temp = [];
  ColumnMode = ColumnMode;  

  constructor(private mealService: MealService) { 
   
    this.subscription = this.mealService.getAll()
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
