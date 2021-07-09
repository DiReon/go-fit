import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminMotivationComponent } from './admin-motivation.component';

xdescribe('AdminMotivationComponent', () => {
  let component: AdminMotivationComponent;
  let fixture: ComponentFixture<AdminMotivationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMotivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
