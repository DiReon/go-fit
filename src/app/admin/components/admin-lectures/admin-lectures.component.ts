import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-lectures',
  templateUrl: './admin-lectures.component.html',
  styleUrls: ['./admin-lectures.component.css']
})
export class AdminLecturesComponent implements OnInit {
  type = 'lectures';
  constructor() { }

  ngOnInit(): void {
  }

}
