import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaverrorComponent } from './faverror.component';

describe('FaverrorComponent', () => {
  let component: FaverrorComponent;
  let fixture: ComponentFixture<FaverrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaverrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaverrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
