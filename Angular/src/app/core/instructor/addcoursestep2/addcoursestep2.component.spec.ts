import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcoursestep2Component } from './addcoursestep2.component';

describe('Addcoursestep2Component', () => {
  let component: Addcoursestep2Component;
  let fixture: ComponentFixture<Addcoursestep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addcoursestep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addcoursestep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
