import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.css']
})
export class AdminTrainingsComponent implements OnInit {
  type = 'trainings';
  constructor() { }

  ngOnInit(): void {
  }

}
