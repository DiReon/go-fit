import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { AngularFireList } from '@angular/fire/database';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MealService } from 'src/app/shared/services/meal.service';

@Component({
  selector: 'app-diet',
  templateUrl: './admin-diet.component.html',
  styleUrls: ['./admin-diet.component.css']
})
export class AdminDietComponent implements OnInit {
  type = 'meals';
  constructor() { }

  ngOnInit(): void {
  }

}
