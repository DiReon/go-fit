import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeditationsComponent } from './admin-meditations.component';

describe('AdminMeditationsComponent', () => {
  let component: AdminMeditationsComponent;
  let fixture: ComponentFixture<AdminMeditationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMeditationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMeditationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
