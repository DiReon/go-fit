import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  canActivate() {
    // return this.authService.user$.pipe(
    //   switchMap(user => this.userService.get(user.uid).valueChanges()),
    //   map(appUser => appUser.isAdmin)
    // )
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin))
  }

}
