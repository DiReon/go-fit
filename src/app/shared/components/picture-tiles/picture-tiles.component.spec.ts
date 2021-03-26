import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureTilesComponent } from './picture-tiles.component';

describe('PictureTilesComponent', () => {
  let component: PictureTilesComponent;
  let fixture: ComponentFixture<PictureTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
