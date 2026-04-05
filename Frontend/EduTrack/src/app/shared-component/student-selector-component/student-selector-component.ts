import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ParentService } from '../../services/parent.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-selector-component.html',
  styleUrl: './student-selector-component.css'
})
export class StudentSelectorComponent implements OnInit {
  // 1. التنبيه اللي رح يخبر صفحة الـ Attendance أو الـ Grades إن الولد تغير
  @Output() studentChanged = new EventEmitter<number>();

  private _parentService = inject(ParentService);
  private _auth = inject(AuthService);

  // المصفوفة اللي رح نخزن فيها الـ JSON اللي بعتته (stu1, qqqq)
  students: any[] = [];
  selectedStudentId: number | null = null;

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    const userId = this._auth.getUserId();
    if (userId) {
      // مننادي الـ API اللي صلحناها بالـ Backend
      this._parentService.GetParentByUserId(userId).subscribe({
        next: (res: any) => {
          // res.students هي المصفوفة اللي فيها (stu1 و qqqq)
          this.students = res.students ;

          // ثانياً: إذا أول مرة بيفتح، بنختار أول ولد تلقائياً (stu1 مثلاً)
           if (this.students.length > 0) {
            this.onSelect(this.students[0].id);
          }
        },
        error: (err) => console.error('خطأ في جلب بيانات الطلاب:', err)
      });
    }
  }

  // الدالة اللي بتشتغل لما الأب يكبس على الزر في الـ HTML
  onSelect(studentId: number) {
    this.selectedStudentId = studentId;
    
    // بنخزن الـ ID في الـ LocalStorage (للاستمرارية)
    localStorage.setItem('selectedStudentId', studentId.toString());
    
    // بنبعث الـ ID الجديد للصفحة الأم (الـ Attendance مثلاً)
    this.studentChanged.emit(studentId);
    
    console.log('تم اختيار الطالب بنجاح، ID:', studentId);
  }
}