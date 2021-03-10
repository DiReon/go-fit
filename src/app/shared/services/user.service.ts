import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AppUser } from 'src/app/shared/models/app-user';
import { Training } from 'src/app/shared/models/training';
import { MyRecord } from '../models/my-record';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    console.log(user);
    
    this.db.object('/users/' + user.uid).update({
      userId: user.uid,
      name: user.displayName, 
      email: user.email,
      photoUrl: user.photoURL,
    })
  }

  update(userId, user) {
    this.db.object('/users/' + userId).update(user)
  }

  get(uid: string): AngularFireObject<AppUser> {
    console.log("called userService.get(", uid, ")");
    
    return this.db.object('/users/' + uid)
  }

  getCompletedTrainings(uid: string) {
    let completedTrainings$ = this.db.object<Training>('/users/' + uid + '/completedTrainings').valueChanges()
    return completedTrainings$;
  }

  delete(uid: string) {
    this.db.object('/users/'+uid).remove();
  }
  
  markTrainingCompleted(uid: string, id: string, title: string) {
    this.db.list('/users/' + uid + '/completedTrainings').push(id);
    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
     
    this.db.list(`/users/${uid}/journal`).update(date, {date: date}); 
    this.db.list(`/users/${uid}/journal/${date}/trainingTitles`).push(title); 
  }

  markLectureCompleted(uid: string, id: string) {
    this.db.list('/users/' + uid + '/completedLectures').push(id)
  }

  addToJournal(uid: string, record: MyRecord) {
    console.log("add to Journal: ", uid, record);
    
    this.db.list(`/users/${uid}/journal`).update(record.date, record);
    if (record.weight) this.db.object(`/users/${uid}/lastWeight`).set(record.weight);
  }

}
