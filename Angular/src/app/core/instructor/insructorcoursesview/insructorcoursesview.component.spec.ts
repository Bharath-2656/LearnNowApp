import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsructorcoursesviewComponent } from './insructorcoursesview.component';

describe('InsructorcoursesviewComponent', () => {
  let component: InsructorcoursesviewComponent;
  let fixture: ComponentFixture<InsructorcoursesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsructorcoursesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsructorcoursesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
