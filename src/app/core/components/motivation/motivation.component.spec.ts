import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MotivationComponent } from './motivation.component';

xdescribe('MotivationComponent', () => {
  let component: MotivationComponent;
  let fixture: ComponentFixture<MotivationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
