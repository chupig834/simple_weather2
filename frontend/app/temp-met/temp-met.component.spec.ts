import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMetComponent } from './temp-met.component';

describe('TempMetComponent', () => {
  let component: TempMetComponent;
  let fixture: ComponentFixture<TempMetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempMetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempMetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
