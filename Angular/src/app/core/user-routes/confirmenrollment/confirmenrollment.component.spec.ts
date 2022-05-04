import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmenrollmentComponent } from './confirmenrollment.component';

describe('ConfirmenrollmentComponent', () => {
  let component: ConfirmenrollmentComponent;
  let fixture: ComponentFixture<ConfirmenrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmenrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
