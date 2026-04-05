import { Component, inject } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceInterface } from '../../interfaces/attendance-interface';
import { DatePipe } from '@angular/common';
import { ParentInterface } from '../../interfaces/parent-interface';
import { ParentService } from '../../services/parent.service';
import { AuthService } from '../../services/auth.service';
import { StudentSelectorComponent } from '../../shared-component/student-selector-component/student-selector-component';
@Component({
  selector: 'app-parent-attendance',
  imports: [DatePipe, StudentSelectorComponent],
  templateUrl: './parent-attendance.html',
  styleUrl: './parent-attendance.css'
})
// export class ParentAttendance {
//   auth = inject(AuthService);

//   constructor(private _AttendanceService: AttendanceService,
//     private _ParentService: ParentService
//   ) { }

//   attendances: AttendanceInterface[] = [];
//   parent: ParentInterface | null = null;


//   ngOnInit() {
//     // this.parentinfo(1)
//     const userId = this.auth.getUserId();
//     console.log('Parent userId:', userId);

//     if (userId) {
//       this.getParentInfo(userId);
//     }
//   }

//   loadAttendance(id: number) {
//      this._AttendanceService.GetByStudentId(id).subscribe({
//       next: (res: any) => {

//         this.attendances = res;
//       },
//       error: err => {// failed request | 400 , 500
//         console.log(err.error.message ?? err.error ?? "Unexpected Error");
//       }

//     });

// }


//   getParentInfo(userId: number) {
//     this._ParentService.GetParentByUserId(userId).subscribe({
//       next: (res: any) => {
//         this.parent = res;
//         console.log('Parent Info:', this.parent);
//         if (this.parent?.studentId != null) {
//           this.loadAttendance(this.parent.studentId);
//         } else {
//           alert('No student linked to this parent')
//         }
//       },
//       error: err => {
//         console.log(err.error.message ?? err.error ?? "Unexpected Error");
//       }
//     });
//   }

// }
export class ParentAttendance {

  constructor(private _AttendanceService: AttendanceService) { }
  
  attendances: AttendanceInterface[] = [];

  // ✅ 1. شلنا getParentInfo بالكامل لأن الـ Shared Component هو اللي بجيب الطلاب هسا
  ngOnInit() {
    // بنشيك إذا في طالب مختار بالذاكرة عشان لو عمل Refresh
    const savedId = localStorage.getItem('selectedStudentId');
    if (savedId) {
      this.loadAttendance(Number(savedId));
    }
  }

  // ✅ 2. هاي الدالة اللي رح تستقبل الـ ID من الـ Shared Component
  onStudentChanged(id: number) {
    this.loadAttendance(id);
  }

  loadAttendance(id: number) {
    this._AttendanceService.GetByStudentId(id).subscribe({
      next: (res: any) => {
        this.attendances = res;
      },
      error: err => {
        this.attendances = [];
        console.log("لا يوجد غيابات لهذا الطالب");
      }
    });
  }
}