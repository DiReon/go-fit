import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { of, from } from 'rxjs';
import { User, auth } from 'firebase';


class RouterStub {
  navigate(params) {}
}

const ActivatedRouteStub = {
  snapshot: {
    queryParams: {
        returnUrl: '/'
    },
    paramMap: {get() {return 'id'}},
    queryParamMap: {get() {return 'returnUrl'}}
  }
};


describe('AuthService', () => {
  const mockUser = {
    displayName: 'Dmitry'
  }

  let afStub = {
    authState: of(mockUser),
    signInWithPopup() {return signInWithPopupSpy}
  }

  let authService: AuthService;
  var userServiceSpy: jasmine.SpyObj<UserService>;
  var signInWithPopupSpy = jasmine.createSpyObj("signInWithPopup", ['then']);
  const spy = jasmine.createSpyObj("UserService", ['save']);
  signInWithPopupSpy.then.and.returnValue(spy.save(mockUser))
  beforeEach(() => {
    
    TestBed.configureTestingModule({
    providers: [
        AuthService,
        {provide: UserService, useValue: spy},
        {provide: AngularFireAuth, useValue: afStub},
        {provide: ActivatedRoute, useFactory: () => ActivatedRouteStub},
        {provide: Router, useClass: RouterStub}
      ]
    });
    authService = TestBed.inject(AuthService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    

  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should get user data from Google', ()=> {
    authService.user$.subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.displayName).toEqual("Dmitry");
    })
  })
  it('should call save method of userService with user parameters', ()=> {
    authService.login();
    // userServiceSpy.save(null)
    // userServiceSpy.save.and.returnValue(null)
    expect(signInWithPopupSpy.then).toHaveBeenCalledTimes(1)
    expect(spy.save).toBeDefined()
    expect(spy.save).toHaveBeenCalledWith(mockUser)
    expect(spy.save).toHaveBeenCalledTimes(1)
    // expect(userServiceSpy.save.calls.count()).toBe(1)
  })
});
