import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PictureTilesComponent } from './picture-tiles.component';

describe('PictureTilesComponent', () => {
  let component: PictureTilesComponent;
  let fixture: ComponentFixture<PictureTilesComponent>;

  beforeEach(waitForAsync(() => {
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
