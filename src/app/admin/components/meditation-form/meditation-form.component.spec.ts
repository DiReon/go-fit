import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationFormComponent } from './meditation-form.component';

describe('MeditationFormComponent', () => {
  let component: MeditationFormComponent;
  let fixture: ComponentFixture<MeditationFormComponent>;

  beforeEach(async(() => {
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
