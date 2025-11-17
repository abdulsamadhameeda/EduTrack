import { Component } from '@angular/core';
import { TeacherInterface } from '../../interfaces/teacher-interface';
import { TeacherService } from '../../services/teacher.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css'
})
export class Teacher {
  constructor(private _TeacherService: TeacherService,
    private _AuthService: AuthService
  ) { }

  teacher: TeacherInterface | null = null;  // مش مصفوفة

  ngOnInit() {

    // this.techerinfo(5);
 const userId = this._AuthService.getUserId(); // استخرج الـ ID من التوكن
  console.log('Teacher ID:', userId);

  if (userId) {
    this.getTeacherInfo(userId); // استخدم الـ id من التوكن مش رقم ثابت
  }
  }

  // techerinfo(id: number) {

  //   this._TeacherService.GetTeacher(id).subscribe({
  //     next: (res: any) => {
        
  //       this.teacher = res;
  //     },
  //      error: err => {// failed request | 400 , 500
  //       console.log(err.error.message ?? err.error ?? "Unexpected Error");
  //     }



  //   })
  // }

  
getTeacherInfo(userId: number) {
  this._TeacherService.GetTeacherByUserId(userId).subscribe({
    next: (res: any) => {
      this.teacher = res;
      console.log('Teacher Info:', this.teacher);
    },
    error: err => {
      console.log(err.error.message ?? err.error ?? "Unexpected Error");
    }
  });


}

}
