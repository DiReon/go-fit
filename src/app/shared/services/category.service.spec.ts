import { TestBed } from '@angular/core/testing';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { CategoryService } from './category.service';


xdescribe('CategoryService', () => {
  let service: CategoryService;

  
  beforeEach(() => {

    let objectSpy :jasmine.Spy = jasmine.createSpy("object").and.callFake((path: string) => {
      if(path.includes("123")) {
        return {
          valueChanges: () => {
            return of({
                title: "Example Post",
                body: "Body",
              })
            }
        }
      } else {
        return Observable.throw("Invalid path!");
      }
    });

    let listSpy :jasmine.Spy = jasmine.createSpy("list").and.callFake((path: string) => {
        return {
          valueChanges: () => {
            return of([{
                title: "Example Post",
                body: "Body",
              }])
            }
        }
    });

    let afStub: any = {
        object: objectSpy,
        list: listSpy
    };
    
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        {provide: AngularFireDatabase, useValue: afStub}
      ]
    });
    service = TestBed.inject(CategoryService);
        
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#get should return stubbed value from a spy', () => {
    service.get('123').valueChanges().subscribe( (i: any) => {
      expect('objectSpy').toHaveBeenCalled
      // expect(service.get).toHaveBeenCalled()
      expect(i.title).toBe("Example Post")
      expect(i.body).toBe('Body')
    })
  });

  it('#get should return stubbed list from a spy', () => {
    service.getAll().valueChanges().subscribe( (i: any) => {
      expect('listSpy').toHaveBeenCalled
      expect(i.length).toBe(1)
      expect(i[0].title).toBe("Example Post")
      expect(i[0].body).toBe('Body')
    })
  });

});
