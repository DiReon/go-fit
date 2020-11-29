import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavbarComponent } from './bs-navbar.component';
import { AuthService } from '../../../shared/services/auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockAuthService {
  get appUser$(){
    return of({name: "Dmitry"})
  }
}

fdescribe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;
  let spy = jasmine.createSpyObj('AuthService', ['appUser$'])
  spy.appUser$.and.returnValue(of({name: "Dmitry"}))
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent ],
      providers: [{provide: AuthService, useClass: MockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name', ()=>{
    component.appUser.name = "Regina"
    fixture.detectChanges()
    let de = fixture.debugElement.query(By.css('.username'))
    let el: HTMLElement = de.nativeElement
    expect(el.innerText).toBe("Regina")
  })
  // it('should render menu in collapsed state', ()=>{
  //   let de = fixture.debugElement.query(By.css('.navbar-collapse'))
  //   expect(de.classes['show']).toBeFalsy()
  // })
  // it('should expand menu if collapsed property set to false', ()=>{
  //   component.isMenuCollapsed = false;
  //   fixture.detectChanges();
  //   let de = fixture.debugElement.query(By.css('.navbar-collapse'))
  //   expect(de.classes['show']).toBeTruthy()
  // })
  it('should render menu in expanded state, if toggler button was clicked', ()=>{
    let de = fixture.debugElement.query(By.css('.navbar-toggler'))
    let menu = fixture.debugElement.query(By.css('.navbar-collapse'))
    de.triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(component.isMenuCollapsed = true);
    expect(menu.classes['show']).toBeTruthy;
  })
  it('should render menu in collapsed state, if toggler button was clicked', ()=>{
    let de = fixture.debugElement.query(By.css('.navbar-toggler'))
    let menu = fixture.debugElement.query(By.css('.navbar-collapse'))
    de.triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(component.isMenuCollapsed = false);
    expect(menu.classes['show']).toBeFalsy;
  })

});
