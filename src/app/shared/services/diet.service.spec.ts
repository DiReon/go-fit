import { TestBed } from '@angular/core/testing';

import { MealService } from './meal.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';
import { Meal } from '../models/meal';

describe('DietService', () => {
  let service: MealService;
  let path = '/meals';
  let id = '123'
  const mockedData = [{
    payload:{
      key: 'test key',
      val() { return {
        title: 'test title'
      }}
    },
    title: 'test item title'

  },{
    payload:{
      key: 'asdf',
      val() { return 'Yes'}
    },
    title: 'fake title'
  }]
  var insideList = jasmine.createSpyObj('list', ['snapshotChanges', 'push']);
  var objectSpy = jasmine.createSpyObj('object', ['valueChanges', 'update', 'remove']);
  var afSpy = jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  afSpy.list.and.returnValue(insideList);
  afSpy.object.and.returnValue(objectSpy);
  insideList.snapshotChanges.and.returnValue(of(mockedData));
  objectSpy.valueChanges.and.returnValue(of(mockedData[0]));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MealService,
        {provide: AngularFireDatabase, useValue: afSpy}
      ]
    })
    service = TestBed.inject(MealService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return items when getAll methos is called', () => {
    service.getAll().subscribe(items => {
      expect(items.length).toBe(2)
      expect(items[0].key).toEqual('test key')
      expect(items[0].title).toEqual('test title')
    })
  })

  it('should return and item when get is called', () => {
    service.get('123').valueChanges().subscribe(item =>{
      expect(item.title).toBe('test item title');
    })
  })
  it('#create should create an item in the list', ()=>{
    service.create(mockedData[0])
    expect(afSpy.list).toHaveBeenCalledWith(path)
    expect(insideList.push).toHaveBeenCalledWith(mockedData[0])
    expect(insideList.push).toHaveBeenCalledTimes(1)
  })
  it('#update should update an item in the list with new data', ()=>{
    service.update(id, mockedData[0])
    expect(afSpy.object).toHaveBeenCalledWith(path + '/' + id)
    expect(objectSpy.update).toHaveBeenCalledWith(mockedData[0])
  })
  it('#delete should remove an item from the list of meals', ()=>{
    service.delete(id)
    expect(afSpy.object).toHaveBeenCalledWith(path+'/'+id)
    expect(objectSpy.remove).toHaveBeenCalledWith()
  })

})

