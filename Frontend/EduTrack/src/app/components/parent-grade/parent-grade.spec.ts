import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentGrade } from './parent-grade';

describe('ParentGrade', () => {
  let component: ParentGrade;
  let fixture: ComponentFixture<ParentGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentGrade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentGrade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
