import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrainingCardComponent } from './training-card.component';

xdescribe('TrainingCardComponent', () => {
  let component: TrainingCardComponent;
  let fixture: ComponentFixture<TrainingCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
