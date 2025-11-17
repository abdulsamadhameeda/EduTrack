import { Component } from '@angular/core';
import { ListInterface } from '../../interfaces/list-interface';
import { LookupService } from '../../services/lookup.service';
import { LookupsMajorCodes } from '../../enums/lookups-major-codes';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentInterface } from '../../interfaces/parent-interface';
import { TeacherInterface } from '../../interfaces/teacher-interface';
import { ParentService } from '../../services/parent.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-teacher-add-stu',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-add-stu.html',
  styleUrl: './teacher-add-stu.css'
})
export class TeacherAddStu {

  constructor(private _lookupService: LookupService,
    private _ParentService: ParentService,
    private _TeacherService: TeacherService,
    private _StudentService: StudentService
  ) { }

  gradeLevel: ListInterface[] = []
  class: ListInterface[] = []
  parent: ParentInterface[] = []
  teacher: TeacherInterface[] = []

  SaveStudentForm: FormGroup = new FormGroup({
    GradeLevelId: new FormControl(null, [Validators.required]),
    ClassId: new FormControl(null, [Validators.required]),
    ParentId: new FormControl(null, [Validators.required]),
    TeacherId: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required])
  })


  ngOnInit() {

    this.loadClass();
    this.loadGradeLevel();
    this.loadParents()
    this.loadTeachers()

  }



  loadGradeLevel() {
    this.gradeLevel = [{ Id: null, Name: "Select GradeLevel" }]
    this._lookupService.getByMajorCode(LookupsMajorCodes.gradeLevels).subscribe({
      next: (res: any) => { // succesful request 
        if (res?.length > 0) {
          this.gradeLevel = this.gradeLevel.concat(res.map((x: any) => ({ Id: x.id, Name: x.name } as ListInterface))
          )


        }
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }


    })

  }
  loadClass() {
    this.class = [{ Id: null, Name: "Select class" }]
    this._lookupService.getByMajorCode(LookupsMajorCodes.classes).subscribe({
      next: (res: any) => { // succesful request 
        if (res?.length > 0) {
          this.class = this.class.concat(res.map((x: any) => ({ Id: x.id, Name: x.name } as ListInterface))
          )


        }
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }


    })

  }

  loadParents() {

    this.parent = [{ id: null, name: "Select parent", phone: null, email: null }]

    this._ParentService.GetAll().subscribe({
      next: (res: any) => {
        this.parent = [{ id: null, name: "Select parent", phone: 0, email: null, studentId: null }, ...res];


      },
      error: err => {
        console.error('Error loading parents', err)


      }
    });
  }
  loadTeachers() {

    this.teacher = [{ id: null, name: "Select teacher", phone: null, email: null }]

    this._TeacherService.GetAll().subscribe({
      next: (res: any) => {
        this.teacher = [{ id: null, name: "Select teacher" }, ...res];


      },
      error: err => {
        console.error('Error loading parents', err)


      }
    });
  }



  addStudent() {
    if (this.SaveStudentForm.invalid) {
      this.SaveStudentForm.markAllAsTouched();
      return;
    }

    let student = {
      name: this.SaveStudentForm.value.Name,
      gradeLevelId: this.SaveStudentForm.value.GradeLevelId,
      classId: this.SaveStudentForm.value.ClassId,
      parentId: this.SaveStudentForm.value.ParentId,
      teacherId: this.SaveStudentForm.value.TeacherId
    };

    this._StudentService.add(student).subscribe({
      next: (res: any) => {
        alert('Student added successfully!');
        this.SaveStudentForm.reset();
        this.loadParents()
      },
      error: err => {
        console.error(err);
        alert('Error adding student');
      }
    });
  }


}
