import { Component, inject } from '@angular/core';
import { ParentService } from '../../services/parent.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../interfaces/assignment-interfaces';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-parent-assignment',
  imports: [DatePipe],
  templateUrl: './parent-assignment.html',
  styleUrl: './parent-assignment.css'
})
export class ParentAssignment {
    auth = inject(AuthService);

  constructor(private _ParentService: ParentService,
    private _AssignmentService: AssignmentService
  ) { }


  parent: ParentInterface | null = null;
  assignments: Assignment[] = [];

  ngOnInit() {
    // this.parentinfo(2)
   const userId = this.auth.getUserId();
    console.log('Parent userId:', userId);

    if (userId) {
      this.getParentInfo(userId);
    }
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

  // parentinfo(id: number) {

  //   this._ParentService.GetParent(id).subscribe({
  //     next: (res: any) => {

  //       this.parent = res;
  //         this.loadAssignments(res.studentId);

  //     },
  //     error: err => {// failed request | 400 , 500
  //       console.log(err.error.message ?? err.error ?? "Unexpected Error");
  //     }



  //   })
  // }

getParentInfo(userId: number) {
    this._ParentService.GetParentByUserId(userId).subscribe({
      next: (res: any) => {
        this.parent = res;
        console.log('Parent Info:', this.parent);
         if (this.parent?.studentId != null) {
          this.loadAssignments(this.parent.studentId);
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
