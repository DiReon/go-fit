import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  listRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(type, content) {
    this.db.list(`/${type}`).push(content);
  }

  update(type, contentId, content) {
    return this.db.object(`/${type}/${contentId}`).update(content);
  }

  getAll(type: string) {
    this.listRef = this.db.list(`/${type}`);
    console.log("Shared service is called with ", type);
    
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  getFromCategory(category: string) {
    this.listRef = this.db.list('/trainings/', ref => ref.orderByChild('category').equalTo(category) )
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }


  get(type: string, contentId: string) {
    return this.db.object<any>(`/${type}/${contentId}`);
  }
  
  delete(type: string, contentId: string) {
    return this.db.object(`/${type}/${contentId}`).remove();
  }

}
