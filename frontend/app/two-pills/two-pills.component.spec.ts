import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPillsComponent } from './two-pills.component';

describe('TwoPillsComponent', () => {
  let component: TwoPillsComponent;
  let fixture: ComponentFixture<TwoPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
