import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingsComponent } from './admin-trainings.component';
import { from } from 'rxjs';
import { TrainingService } from 'src/app/training.service';

let rows = [{1: 1}, {2: 2}]

class MockTrainingService {
  listRef;
  constructor() { }
  create(training) {}
  update(trainingId, training) {}
  getAll() {return from([rows])}
  getFromCategory(category) {}
  get(trainingId) {}
  delete(trainingId) {}
}


describe('AdminTrainingsComponent', () => {
  let component: AdminTrainingsComponent;
  let fixture: ComponentFixture<AdminTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrainingsComponent ],
      providers: [
        {provide: TrainingService, useClass: MockTrainingService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rows property with items returned from the server', () => {

    component.ngOnInit();

    expect(component.rows).toBe(rows);
  })

  it('should filter array of items', ()=>{
    let query = 'bc';
    
    component.temp = [{title: 'a'}, {title: 'ab'}, {title: 'abc'}, {title: 'abcd'},];

    component.filter(query)

    expect(component.rows).toEqual([{title: 'abc'}, {title: 'abcd'},])
  })

});
