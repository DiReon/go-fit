import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'go-fit';
  items;
  constructor(private db: AngularFireDatabase) {
    console.log("Hello world!");
    
    this.items = db.list('items').valueChanges()
  }
}
