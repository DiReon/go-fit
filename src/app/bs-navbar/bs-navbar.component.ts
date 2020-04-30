import { Component, OnInit } from '@angular/core';
import { faStudiovinari } from '@fortawesome/free-brands-svg-icons';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  icon = faStudiovinari;
  public isMenuCollapsed = true;
  appUser: AppUser;
  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(u => this.appUser = u);
    
  }

  ngOnInit(): void {

  }

  logout() {
   this.authService.logout(); 
  }

}
