import { Component } from '@angular/core';
import { ListInterface } from '../../interfaces/list-interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentInterface } from '../../interfaces/student-interface';
import { StudentService } from '../../services/student.service';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceInterface } from '../../interfaces/attendance-interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { LookupsMajorCodes } from '../../enums/lookups-major-codes';
import { LookupService } from '../../services/lookup.service';
@Component({
  selector: 'app-teacher-attendance',
  imports: [FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './teacher-attendance.html',
  styleUrl: './teacher-attendance.css'
})
export class TeacherAttendance {


  constructor(private _studentSrvice: StudentService,
    private _attendanceServices: AttendanceService,
    private _lookupService: LookupService) { }

  students: StudentInterface[] = []

  gradeLevel: ListInterface[] = []
  class: ListInterface[] = []

  searchFilterForm: FormGroup = new FormGroup({
    GradeLevelId: new FormControl(null),
    ClassId: new FormControl(null),
  })



  StudentTableColumns: string[] = [
    '#',
    'Name',
    'grade level',
    'class',
    'check'
  ];

  ngOnInit() {

    this.loadstudent();
    this.loadClass();
    this.loadGradeLevel();

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
              parentId: x.ParentId



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



  addAttendance() {
    let absents: AttendanceInterface[] = this.students
      .filter(stu => stu.isAbsent) // الغائبين فقط
      .map(stu => ({
        id: 0,
        studentId: stu.id,
        dayAbsent: new Date()
      }));

    let payload =  absents ;

    this._attendanceServices.add(payload).subscribe({
      next: (res: any) => {
        this.students.forEach(stu => stu.isAbsent = false)
        alert('Attendance saved');
      },
      error: err => {
        // ⚠️ هنا نتحقق من رسالة الـ backend
        if (err.error?.includes('already marked absent')) {
          // نجيب الـ StudentId من الرسالة
          const match = err.error.match(/StudentId (\d+)/);
          if (match) {
            const studentId = +match[1];
            const student = this.students.find(s => s.id === studentId);
            if (student) {
              alert(`${student.name} is already marked absent for today!`);
              student.isAbsent = false; // نلغي الـ checkbox
            }
          }
        } else {
          alert('Something went wrong!');
        }
      }
    });
  }

  paginationconfig = { itemsPerPage: 5, currentPage: 1 };
  changePage(pageNumber: number) {
    this.paginationconfig.currentPage = pageNumber;
  }




}
