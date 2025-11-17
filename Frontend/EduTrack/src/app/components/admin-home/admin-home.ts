import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentService } from '../../services/parent.service';
import { TeacherService } from '../../services/teacher.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { TeacherInterface } from '../../interfaces/teacher-interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [FormsModule, ReactiveFormsModule ,RouterLink,RouterLinkActive],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome {


  constructor(private _ParentService: ParentService,
    private _TeacherService: TeacherService
  ) { }


  SaveUserForm: FormGroup = new FormGroup({
    name : new FormControl(null, Validators.required),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),

  })




  addTeacher() {

    if (this.SaveUserForm.invalid) {
      this.SaveUserForm.markAllAsTouched();
      return;
    }

    let teacher = {
      name: this.SaveUserForm.value.name,
      email: this.SaveUserForm.value.email,
      phone: this.SaveUserForm.value.phone,

    };

    this._TeacherService.add(teacher).subscribe({
      next: (res: any) => {
        alert('Teacher added successfully!');
        this.SaveUserForm.reset();
      },
      error: err => {
        console.error(err);
        alert('Error adding Teacher');
      }

    });
  }


  addParent() {

    if (this.SaveUserForm.invalid) {
      this.SaveUserForm.markAllAsTouched();
      return;
    }

    let parent = {
      name: this.SaveUserForm.value.name,
      email: this.SaveUserForm.value.email,
      phone: this.SaveUserForm.value.phone,

    };

    this._ParentService.add(parent).subscribe({
      next: (res: any) => {
        alert('Parent added successfully!');
        this.SaveUserForm.reset();
      },
      error: err => {
        console.error(err);
        alert('Error adding Parent');
      }
    });
  }



}
