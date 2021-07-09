import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeditationsComponent } from './meditations.component';

xdescribe('MeditationsComponent', () => {
  let component: MeditationsComponent;
  let fixture: ComponentFixture<MeditationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
