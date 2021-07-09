import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeditationFormComponent } from './meditation-form.component';

xdescribe('MeditationFormComponent', () => {
  let component: MeditationFormComponent;
  let fixture: ComponentFixture<MeditationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
