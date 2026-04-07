
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";


import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Assignment } from '../../interfaces/assignment-interfaces';
import { CommonModule, DatePipe } from '@angular/common';
import { AssignmentService } from '../../services/assignment.service';
import { ListInterface } from '../../interfaces/list-interface';
import { LookupService } from '../../services/lookup.service';
import { LookupsMajorCodes } from '../../enums/lookups-major-codes';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-teacher-assignment',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './teacher-assignment.html',
  styleUrls: ['./teacher-assignment.css'],
  standalone: true,
  providers: [DatePipe],
})
export class TeacherAssignment {





  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;// Quickfix or eng

  constructor(
    private datePipe: DatePipe,
    private _assignmentService: AssignmentService,
    private _lookupService: LookupService,
    private _authService: AuthService
  ) { }

  assignment: Assignment[] = []

  gradeLevel: ListInterface[] = []

  class: ListInterface[] = []

  subject: ListInterface[] = []




  Assignmentform = new FormGroup({
    id: new FormControl<number | null>(null),
    subjectId: new FormControl<number | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    dueDateSub: new FormControl<string | null>(null),
    classId: new FormControl<number | null>(null, [Validators.required]),
    gradeLevelId: new FormControl<number | null>(null, [Validators.required]),

  });


  assighnmentTableColumns: string[] = ['#', 'Subject', 'Description', 'Due Date', 'Class', 'GradeLevel'];




  ngOnInit(): void {
    this.loadassignment();
    this.loadGradeLevel();
    this.loadClass();
    this.loadSubject()
  }


  loadassignment() {
    this.assignment = [];
    let teacherId = this._authService.getUserId();

    this._assignmentService.getAll(Number(teacherId)).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          res.forEach((x: any) => {
            let assignments: Assignment = {
              id: x.id,
              subjectId: x.subjectId, // إذا حاب تحفظ الـ Id
              subjectName: x.subjectName, // للاسم اللي يظهر
              description: x.description,
              dueDateSub: x.dueDateSub,
              classId: x.classId,
              className: x.class, // الاسم للشعبه
              gradeLevelId: x.gradeLevelId,
              gradeLevelName: x.gradeLevel, // الاسم للصف
            };

            this.assignment.push(assignments);
          });
        }
      },
      error: (err) => {
        console.log(err?.error?.message ?? err?.error ?? 'Unexpected error');
      }
    });
  }



  editAssignment(id: number) {
    let assignment = this.assignment.find((x) => x.id == id);



    if (assignment != null) {
      this.Assignmentform.patchValue({
        id: assignment.id,
        subjectId: assignment.subjectId,
        description: assignment.description,
        dueDateSub: assignment.dueDateSub?.toString().substring(0, 10),
        classId: assignment.classId,
        gradeLevelId: assignment.gradeLevelId,

      });
    }

  }

  Addassignment() {
    let assignment = this.Assignmentform.value.id ?? 0

    let payload = {
      id: assignment,
      description: this.Assignmentform.value.description,
      dueDateSub: this.Assignmentform.value.dueDateSub ? new Date(this.Assignmentform.value.dueDateSub)
        : new Date(),
      subjectId: this.Assignmentform.value.subjectId,
      classId: this.Assignmentform.value.classId,
      gradeLevelId: this.Assignmentform.value.gradeLevelId,
      teacherId: this._authService.getUserId()
    };

    if (!this.Assignmentform.value.id) {
      this._assignmentService.add(payload).subscribe({
        next: _ => {
          this.loadassignment();
          this.Assignmentform.reset();
        },
        error: err => {
          console.log(err?.error?.message ?? err?.error ?? 'Unexpected error');
        }
      });
    }
    else {
      this._assignmentService.Update(payload as Assignment).subscribe({
        next: _ => {
          this.loadassignment();
        },
        error: err => {
          console.log(err?.error?.message ?? err?.error ?? 'Unexpected error');
        }
      });

    }


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


  deleteAssignment(id: number) {

    this._assignmentService.delete(id).subscribe({
      next: res => {
        alert("Assignment deleted ");
        this.loadassignment();
      },
      error: err => {
        alert(err.error.message ?? err.error ?? "Unexpected Error");
      }


    })
  }




}

















