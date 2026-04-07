import { Component, inject } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { GradeInterface } from '../../interfaces/grade-interface';
import { StudentInterface } from '../../interfaces/student-interface';
import { StudentService } from '../../services/student.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { ParentService } from '../../services/parent.service';
import { AuthService } from '../../services/auth.service';
import { StudentSelectorComponent } from "../../shared-component/student-selector-component/student-selector-component";
@Component({
  selector: 'app-parent-grade',
  imports: [StudentSelectorComponent],
  templateUrl: './parent-grade.html',
  styleUrl: './parent-grade.css'
})
export class ParentGrade {



  grades: GradeInterface[] = []
  studentInfo?: StudentInterface;



  StudentGradesColumns: string[] = [
    '#',
    'Subject',
    'Month Grade',
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
   let savedId = localStorage.getItem('selectedStudentId');
    if (savedId) {
      this.loadGrades(Number(savedId));
    }
    
  }

 onStudentChanged(id: number) {
    this.loadGrades(id);
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

    this.loadStudent(studentId)
    
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



}
