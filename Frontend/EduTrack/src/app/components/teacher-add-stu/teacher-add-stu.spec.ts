import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddStu } from './teacher-add-stu';

describe('TeacherAddStu', () => {
  let component: TeacherAddStu;
  let fixture: ComponentFixture<TeacherAddStu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddStu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAddStu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
