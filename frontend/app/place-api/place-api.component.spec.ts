import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAPIComponent } from './place-api.component';

describe('PlaceAPIComponent', () => {
  let component: PlaceAPIComponent;
  let fixture: ComponentFixture<PlaceAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceAPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
