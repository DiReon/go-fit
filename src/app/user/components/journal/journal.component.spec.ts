import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

import { JournalComponent } from './journal.component';

let routerStub = {
  navigate(params) {}
}

const fakeActivatedRoute = {
  snapshot: {
    queryParams: {
        returnUrl: '/'
    },
    paramMap: {get() {return 'testId'}},
    queryParamMap: {
      get(value) {return 'testId'}
    }
  }
};

let mockUser = {name: "Mock User", id: "mockID"}

class mockAuthService {
  get appUser$ () {
    return of(mockUser)
  }
}

xdescribe('JournalComponent', () => {
  let component: JournalComponent;
  let fixture: ComponentFixture<JournalComponent>;
  let userSpy = jasmine.createSpyObj('UserService', ['addToJournal']);
  let snackSpy = jasmine.createSpyObj('MatSnackBar', ['openSnackBar'])
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalComponent ],
      providers: [
        { provide: AuthService, useClass: mockAuthService },
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerStub},
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute},
        { provide: MatSnackBar, useValue: snackSpy }

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
