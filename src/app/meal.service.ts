import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Meal } from './models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  listRef: AngularFireList<Meal>;

  constructor(private db: AngularFireDatabase) { }

  create(meal) {
    this.db.list('/meals').push(meal);
  }

  update(mealId, meal) {
    return this.db.object('/meals/'+mealId).update(meal);
  }


  getAll() {
    this.listRef = this.db.list('/meals')
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(mealId) {
    return this.db.object<Meal>('/meals/' + mealId);
  }
  
  delete(mealId) {
    return this.db.object('/meals/'+mealId).remove();
  }

  
}
