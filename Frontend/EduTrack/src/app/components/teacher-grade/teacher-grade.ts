import { Component } from '@angular/core';
import { StudentInterface } from '../../interfaces/student-interface';
import { StudentService } from '../../services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GradeInterface } from '../../interfaces/grade-interface';
import { GradeService } from '../../services/grade.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListInterface } from '../../interfaces/list-interface';
import { LookupService } from '../../services/lookup.service';
import { LookupsMajorCodes } from '../../enums/lookups-major-codes';
@Component({
  selector: 'app-teacher-grade',
  imports: [NgxPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-grade.html',
  styleUrl: './teacher-grade.css'
})
export class TeacherGrade {

  constructor(private _studentSrvice: StudentService,
    private _gradeSrvice: GradeService,
    private _lookupService: LookupService) { }

  students: StudentInterface[] = []

  gradeLevel: ListInterface[] = []

  class: ListInterface[] = []

  subject: ListInterface[] = []

  StudentTableColumns: string[] = [
    '#',
    'Name',
    'Grade level',
    'Class',
    'Score'
  ];

  // gradesMap: { [studentId: number]: GradeInterface[] } = {};

  searchFilterForm: FormGroup = new FormGroup({
    GradeLevelId: new FormControl(null),
    ClassId: new FormControl(null),

  })

  subform: FormGroup = new FormGroup({

    subjectId: new FormControl(null, [Validators.required]),

  })

  ngOnInit() {

    this.loadstudent();
    this.loadGradeLevel()
    this.loadClass()
    this.loadSubject()

  }

  loadstudent() {
    this.students = [];
    let searchObj = {
      GradeLevelId: this.searchFilterForm.value.GradeLevelId,
      ClassId: this.searchFilterForm.value.ClassId,
    }
    console.log('searchObj:', searchObj);

    this._studentSrvice.getAll(searchObj).subscribe({

      next: (res: any) => { // succesful request 

        if (res?.length > 0) {
          res.forEach((x: any) => {
            let student: StudentInterface = {
              id: x.id,
              name: x.name,
              class: x.class,
              gradeLevel: x.gradeLevel,
              gradeLevelId: x.gradeLevelId,
              classId: x.classId,
              teacherId: x.teacherId,
              parentId :x.ParentId


            };
            this.students.push(student);

          });
        }
        else {

        }
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }


    })


  }



  paginationconfig = { itemsPerPage: 5, currentPage: 1 };
  changePage(pageNumber: number) {
    this.paginationconfig.currentPage = pageNumber;
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

  loadSubject() {
    this.subject = [{ Id: null, Name: "Select subject" }]
    this._lookupService.getByMajorCode(LookupsMajorCodes.subjects).subscribe({
      next: (res: any) => { // succesful request 
        if (res?.length > 0) {
          this.subject = this.subject.concat(res.map((x: any) => ({ Id: x.id, Name: x.name } as ListInterface))
          )


        }
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }


    })

  }


  addGrades() {
    let subjectId = this.subform?.value?.subjectId; // 👈 قيمة المادة من الـ DropDown
    if (!subjectId) {
      alert('Please select a subject');
      return;
    }
    let grades: GradeInterface[] = this.students
      .filter(stu => stu.grade != null)
      .map(stu => ({
        id: 0,
        studentId: stu.id,
        subjectId: subjectId,
        score: Number(stu.grade)
      }));

    let payload =  grades ;
    if (!grades.length) {
      alert('No grades to submit');
      return;
    }
    this._gradeSrvice.add(payload).subscribe({
      next: () => {
        this.students.forEach(stu => stu.grade = undefined);
        alert('Grades saved');
      },
      error: err => {
        console.log(err.error?.message ?? err.error ?? "Unexpected Error");
        alert('Something went wrong');
      }
    });
  }





}
