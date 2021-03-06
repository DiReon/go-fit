import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LectureFormComponent } from './lecture-form.component';

xdescribe('LectureFormComponent', () => {
  let component: LectureFormComponent;
  let fixture: ComponentFixture<LectureFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
