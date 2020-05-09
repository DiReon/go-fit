import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStudiovinari } from '@fortawesome/free-brands-svg-icons';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  icon = faStudiovinari;
  public isMenuCollapsed = true;
  appUser: AppUser;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService) {
    authService.appUser$.subscribe(u => {
      this.appUser = u;
      if (this.appUser) localStorage.setItem('appUser', this.appUser.userId)
    });
    
  }

  ngOnInit(): void {
  }

  logout() {
   this.authService.logout(); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
