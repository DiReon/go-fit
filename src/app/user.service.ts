import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import { Training } from './models/training';

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
    return this.db.object('/users/' + uid)
  }

  getCompletedTrainings(uid: string) {
    let completedTrainings$ = this.db.object<Training>('/users/' + uid + '/completedTrainings').valueChanges()
    return completedTrainings$;
  }

  delete(uid: string) {
    this.db.object('/users/'+uid).remove();
  }

  
  markCompleted(uid: string, id: string) {
    console.log("Training completed, id: ", id, uid);
    this.db.list('/users/' + uid + '/completedTrainings').push(id)
  }

}
