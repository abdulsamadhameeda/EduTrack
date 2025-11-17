import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGrade } from './teacher-grade';

describe('TeacherGrade', () => {
  let component: TeacherGrade;
  let fixture: ComponentFixture<TeacherGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherGrade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherGrade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
