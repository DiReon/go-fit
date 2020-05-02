import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Training } from './models/training';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  listRef: AngularFireList<Training>;

  constructor(private db: AngularFireDatabase) { }

  create(training) {
    this.db.list('/trainings').push(training);
  }

  update(trainingId, training) {
    return this.db.object('/trainings/'+trainingId).update(training);
  }


  getAll() {
    this.listRef = this.db.list('/trainings')
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(trainingId) {
    return this.db.object<Training>('/trainings/' + trainingId);
  }
  
  delete(trainingId) {
    return this.db.object('/trainings/'+trainingId).remove();
  }

}
