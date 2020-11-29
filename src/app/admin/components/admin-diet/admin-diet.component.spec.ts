import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDietComponent } from './admin-diet.component';
import { MealService } from 'src/app/meal.service';
import { from, empty } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { AngularFireDatabase } from '@angular/fire/database';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

let rows = [{
  title: 'a',
  imageUrl: 'b',
  kkal: 1,
  category: 'c',
  description: 'd',
  key: 'e'
},
{
  title: 'ab',
  imageUrl: 'b',
  kkal: 1,
  category: 'c',
  description: 'd',
  key: 'e'
},
{
  title: 'abc',
  imageUrl: 'b',
  kkal: 1,
  category: 'c',
  description: 'd',
  key: 'e'
}]


class MockMealService {

  constructor() {}
  getAll() {

    return from([rows]);
  }
  listRef;
  get(){
    return null
  }
  create() {}
  update() {}
  delete() {}
}

describe('DietComponent', () => {
  let component: AdminDietComponent;
  let fixture: ComponentFixture<AdminDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDietComponent ],
      providers: [
        {provide: MealService, useClass: MockMealService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.subscription, 'unsubscribe')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rows property with items returned from the server', () => {

    component.ngOnInit();

    expect(component.rows).toBe(rows);
  })

  it('should filter array of meals', ()=>{
    let query = 'bc';
    
    component.temp = [{title: 'a'}, {title: 'ab'}, {title: 'abc'}, {title: 'abcd'},];

    component.filter(query)

    expect(component.rows).toEqual([{title: 'abc'}, {title: 'abcd'},])
  })
  it('onDestroy subscription should be terminated', ()=>{
    component.ngOnDestroy()
    expect(component.subscription.unsubscribe).toHaveBeenCalledTimes(1)
  })


});
