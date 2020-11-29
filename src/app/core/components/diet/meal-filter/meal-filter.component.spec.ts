import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFilterComponent } from './meal-filter.component';

xdescribe('MealFilterComponent', () => {
  let component: MealFilterComponent;
  let fixture: ComponentFixture<MealFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
