import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeditationCardComponent } from './meditation-card.component';

xdescribe('MeditationCardComponent', () => {
  let component: MeditationCardComponent;
  let fixture: ComponentFixture<MeditationCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
