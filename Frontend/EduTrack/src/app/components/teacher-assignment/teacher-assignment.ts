
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
    private _lookupService: LookupService
  ) { }

  teacherassignment: Assignment[] = []

  gradeLevel: ListInterface[] = []

  class: ListInterface[] = []

  subject: ListInterface[] = []




  Assignmentform = new FormGroup({
    subjectId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    dueDateSub: new FormControl(null),
    classId: new FormControl(null, [Validators.required]),
    gradeLevelId: new FormControl(null, [Validators.required]),
  });


  assighnmentTableColumns: string[] = ['#', 'Subject', 'Description', 'Due Date', 'Class', 'GradeLevel'];
  



  ngOnInit(): void {
    this.loadassignment();
    this.loadGradeLevel();
    this.loadClass();
    this.loadSubject()
  }


  loadassignment() {
    this.teacherassignment = [];

    this._assignmentService.getAll().subscribe({
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
              class: x.class, // الاسم للشعبه
              gradeLevelId: x.gradeLevelId,
              gradeLevel: x.gradeLevel, // الاسم للصف
            };

            this.teacherassignment.push(assignments);
          });
        }
      },
      error: (err) => {
        console.log(err?.error?.message ?? err?.error ?? 'Unexpected error');
      }
    });
  }





  saveassignment() {
    let newassignment: Assignment = {
      id: 0,
      subjectId: Number(this.Assignmentform.value.subjectId),
      description: this.Assignmentform.value.description!,
      dueDateSub: this.Assignmentform.value.dueDateSub
        ? new Date(this.Assignmentform.value.dueDateSub)
        : new Date(),
      classId: Number(this.Assignmentform.value.classId ?? 0),
      gradeLevelId: Number(this.Assignmentform.value.gradeLevelId ?? 0),
    };

    let payload = {
      description: newassignment.description,
      dueDateSub: newassignment.dueDateSub,
      subjectId: newassignment.subjectId,
      classId: newassignment.classId,
      gradeLevelId: newassignment.gradeLevelId
    };

    this._assignmentService.add(payload).subscribe({
      next: _ => {
        this.loadassignment();          // إعادة تحميل القائمة
        this.Assignmentform.reset();    // إعادة تعيين الفورم
      },
      error: err => {
        console.log(err?.error?.message ?? err?.error ?? 'Unexpected error');
      }
    });
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



}

















