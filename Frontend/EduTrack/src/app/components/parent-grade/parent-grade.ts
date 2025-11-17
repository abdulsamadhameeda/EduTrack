import { Component, inject } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { GradeInterface } from '../../interfaces/grade-interface';
import { StudentInterface } from '../../interfaces/student-interface';
import { StudentService } from '../../services/student.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { ParentService } from '../../services/parent.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-parent-grade',
  imports: [],
  templateUrl: './parent-grade.html',
  styleUrl: './parent-grade.css'
})
export class ParentGrade {



  grades: GradeInterface[] = []
  studentInfo?: StudentInterface;
  parent: ParentInterface | null = null;



  StudentGradesColumns: string[] = [
    '#',
    'Subject',
    'Score'
  ]
  StudentInfoColumns: string[] = [
    'Name',
    'GradeLevel',
    'Class'
  ]

    auth = inject(AuthService);

  constructor(private _gradeSrvice: GradeService,
    private _StudentService: StudentService,
    private _ParentService: ParentService
  ) { }



  ngOnInit() {
    // this.parentinfo(1)
    const userId = this.auth.getUserId();
    console.log('Parent userId:', userId);

    if (userId) {
      this.getParentInfo(userId);
    }
  }



  loadStudent(studentId: number) {

    this._StudentService.GetById(studentId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.studentInfo = res;
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }


  loadGrades(studentId: number) {
    this.grades = [];

    this._gradeSrvice.GetByStudentId(studentId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.grades = res;
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }

 getParentInfo(userId: number) {
    this._ParentService.GetParentByUserId(userId).subscribe({
      next: (res: any) => {
        this.parent = res;
        console.log('Parent Info:', this.parent);
        if (this.parent?.studentId != null) {
        this.loadGrades(this.parent.studentId);
        this.loadStudent(this.parent.studentId);
      } else {
        alert('No student linked to this parent')
      }
      },
      error: err => {
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }

}
