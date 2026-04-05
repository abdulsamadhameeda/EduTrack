import { Component, inject } from '@angular/core';
import { ParentService } from '../../services/parent.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../interfaces/assignment-interfaces';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StudentSelectorComponent } from "../../shared-component/student-selector-component/student-selector-component";


@Component({
  selector: 'app-parent-assignment',
  imports: [DatePipe, StudentSelectorComponent],
  templateUrl: './parent-assignment.html',
  styleUrl: './parent-assignment.css'
})
export class ParentAssignment {
    auth = inject(AuthService);

  constructor(
    private _AssignmentService: AssignmentService
  ) { }


  assignments: Assignment[] = [];

  ngOnInit() {
      const savedId = localStorage.getItem('selectedStudentId');
    if (savedId) {
      this.loadAssignments(Number(savedId));
    }
  }

onStudentChanged(id: number) {
    this.loadAssignments(id);
  }


  loadAssignments(studentId: number) {
    this._AssignmentService.getAssignmentsByStudentId(studentId).subscribe({
      next: (res: any) => {
        this.assignments = res;
      },
      error: err => {
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }


}
