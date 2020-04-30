import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router ) {
    this.user$ = afAuth.authState;
  }
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        if (user) {
          this.userService.save(user.user)
          let returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl)
        }
      });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$(): Observable<AppUser> {
    
    return this.user$.pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return of(null)
    }))
  }

}
