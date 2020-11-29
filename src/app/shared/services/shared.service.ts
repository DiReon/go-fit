import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private appUser = new BehaviorSubject(this.authService.appUser$);
  sharedUser = this.appUser.asObservable();

  constructor(private authService: AuthService) { }

  nextUser(appUser: Observable<AppUser>) {
    this.appUser.next(appUser);
  }
}
