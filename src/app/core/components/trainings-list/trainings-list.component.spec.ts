import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrainingsListComponent } from './trainings-list.component';

xdescribe('TrainingsListComponent', () => {
  let component: TrainingsListComponent;
  let fixture: ComponentFixture<TrainingsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
