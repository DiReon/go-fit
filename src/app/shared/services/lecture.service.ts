import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  listRef: AngularFireList<Lecture>;

  constructor(private db: AngularFireDatabase) { }

  create(lecture) {
    this.db.list('/lectures').push(lecture);
  }

  update(lectureId, lecture) {
    return this.db.object('/lectures/'+lectureId).update(lecture);
  }


  getAll() {
    this.listRef = this.db.list('/lectures')
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(lectureId) {
    return this.db.object<Lecture>('/lectures/' + lectureId);
  }
  
  delete(lectureId) {
    return this.db.object('/lectures/'+lectureId).remove();
  }
}
