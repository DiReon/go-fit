import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DietComponent } from './diet.component';

xdescribe('DietComponent', () => {
  let component: DietComponent;
  let fixture: ComponentFixture<DietComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
