import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';

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
      // birthday: new Date().toDateString(),
      // sex: 'male',
      // weight: 0,
      // height: 0
    })
  }

  update(userId, user) {
    this.db.object('/users/' + userId).update(user)
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid)
  }

  delete(uid: string) {
    this.db.object('/users/'+uid).remove();
  }

}
