import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { SharedService } from 'src/app/shared/services/shared.service';

import { MealFormComponent } from './meal-form.component';

let mockMeal: Meal = {
  title: 'Test Meal',
  imageUrl: 'test URL', 
  description: 'd', 
  kkal: 10,
  recipe: 'mock recipe',
  key: 'mockKey',
  comments: []
}

class AngularFireObjectStub {
  name: string;
  valuechanges() {
    return Observable
  }
}

class MockMealService {

  constructor() {}
  getAll() {}
  listRef;
  get(id) {
    return function valueChanges() {
      return from([
        {
            date: 12345,
            name: 'Hello World'
        },
        {
            date: 456779,
            name: 'Hola Mundo'
        }
      ])
    }
  }
  create() {}
  update() {}
  delete() {}
}

let routerStub = {
  navigate(params) {}
}

const fakeActivatedRoute = {
  snapshot: {
    queryParams: {
        returnUrl: '/'
    },
    paramMap: {get() {return 'testId'}}
  }
};

xdescribe('MealFormComponent', () => {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;
  let spy = jasmine.createSpyObj('MealService', ['get', 'update', 'create'])
  const getSpy = jasmine.createSpyObj('get', ['valueChanges'])
  spy.get.and.returnValue(getSpy)
  getSpy.valueChanges.and.returnValue(of(mockMeal))

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ MealFormComponent ],
      providers: [
        {provide: SharedService, useValue: spy},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useFactory: () => fakeActivatedRoute},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(routerStub, 'navigate')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get item from service if item id is provided', () => {
    component.ngOnInit()
    expect(component.mealId).toEqual('testId')
    expect(component.meal).toBeTruthy()
    expect(component.meal).toEqual(mockMeal);
  })
  it('#save should call update method of mealService, if mealId is provided, and navigate user to /admin/diet page', () =>{
    component.mealId ='testId';
    component.save(mockMeal);
    expect(spy.update).toHaveBeenCalledTimes(1);
    expect(spy.update).toHaveBeenCalledWith(component.mealId, mockMeal)
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/diet'])
    expect(routerStub.navigate).toHaveBeenCalledTimes(1);
  });

});
