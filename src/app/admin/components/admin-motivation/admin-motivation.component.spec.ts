import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMotivationComponent } from './admin-motivation.component';

describe('AdminMotivationComponent', () => {
  let component: AdminMotivationComponent;
  let fixture: ComponentFixture<AdminMotivationComponent>;

  beforeEach(async(() => {
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
