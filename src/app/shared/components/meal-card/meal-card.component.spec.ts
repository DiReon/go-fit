import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardComponent } from './meal-card.component';

xdescribe('MealCardComponent', () => {
  let component: MealCardComponent;
  let fixture: ComponentFixture<MealCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
