import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { faStudiovinari } from '@fortawesome/free-brands-svg-icons';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'am-navbar',
  templateUrl: './am-navbar.component.html',
  styleUrls: ['./am-navbar.component.css']
})
export class AmNavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    icon = faStudiovinari;
    appUser: AppUser;
    panelOpenState = false;
    constructor(
      private authService: AuthService,
      private breakpointObserver: BreakpointObserver,
    ) {
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
  
  }
