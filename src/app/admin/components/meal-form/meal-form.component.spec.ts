import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFormComponent } from './meal-form.component';
import { MealService } from 'src/app/meal.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Meal } from 'src/app/models/meal';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { from, of, Observable } from 'rxjs';

let mockMeal = {title: 'Test Meal', imageUrl: 'test URL', category: 'c', description: 'd', kkal: 10}

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

describe('MealFormComponent', () => {
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
        {provide: MealService, useValue: spy},
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
