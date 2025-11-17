import { Component, ElementRef, ViewChild } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { TeacherInterface } from '../../interfaces/teacher-interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialog } from "../../shared-component/confirmation-dialog/confirmation-dialog";

@Component({
  selector: 'app-admin-teacher',
  imports: [FormsModule, ReactiveFormsModule, ConfirmationDialog],
  templateUrl: './admin-teacher.html',
  styleUrl: './admin-teacher.css'
})
export class AdminTeacher {
  @ViewChild('closeButton') closeButton: ElementRef | undefined;
  constructor(private _teacherService: TeacherService) { }

  teachers: TeacherInterface[] = []

  teacherTableColumns: string[] = [
    '#',
    'Name',
    'Email',
    'Phone',
  ];


  SaveUserForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),

  })


  ngOnInit() {

    this.loadTeacher()
  }

  loadTeacher() {
    this.teachers = []


    this._teacherService.GetAll().subscribe({

      next: (res: any) => { // succesful request 

        if (res?.length > 0) {
          res.forEach((x: any) => {
            let Teacher: TeacherInterface = {
              id: x.id,
              name: x.name,
              email: x.email,
              phone: x.phone

            };
            this.teachers.push(Teacher);

          });
        }
        else {

        }
      },
      error: err => {// failed request | 400 , 500
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }

    })

  }

  editUser(id: number) {
    let teacher = this.teachers.find((x) => x.id == id);

    if (teacher != null) {
      this.SaveUserForm.patchValue({
        id: teacher?.id,
        name: teacher?.name,
        phone: teacher?.phone,
        email: teacher?.email

      });
    }
  }
  addTeacher() {
    let TeacherId = this.SaveUserForm.value.id ?? 0;

    if (this.SaveUserForm.invalid) {
      this.SaveUserForm.markAllAsTouched();
      return;
    }

    let teacher = {
      id: TeacherId,
      name: this.SaveUserForm.value.name,
      email: this.SaveUserForm.value.email,
      phone: this.SaveUserForm.value.phone,

    };


    if (!this.SaveUserForm.value.id) {

      this._teacherService.add(teacher).subscribe({
        next: (res: any) => {
          alert('Teacher added successfully!');
          this.loadTeacher()
          this.SaveUserForm.reset();
        },
        error: err => {
          console.error(err);
          alert('Error adding Teacher');
        }

      });

    } else {
      this._teacherService.update(teacher).subscribe({
        next: res => {
          alert('Teacher Update successfully!');
          this.loadTeacher();
        },
        error: err => {
          const msg = err?.error?.message ?? err?.message ?? "Unexpected error occurred.";
          alert(msg);
        }


      })

    }

    this.closeButton?.nativeElement.click();
    this.SaveUserForm.reset()
  }


  restForm() {
    this.SaveUserForm.reset()

  }

// --------------

  deleteDialogTitle: string = 'Delete';
  deleteDialogBody: string = 'are you sure for delete this Teacher?';
  showConfirmationDialog: Boolean = false;
  userIdToBeDeleted: number | null = null;

showConfirmDialog(userId: number) {
    this.userIdToBeDeleted = userId;
    this.showConfirmationDialog = true;
  }

  confirmEmployeeDelete(isconfirmed: boolean) {
    if (isconfirmed) {
      this.removeUser();
    }
    this.userIdToBeDeleted = null;
    this.showConfirmationDialog = false;
  }

  removeUser() {
    if (this.userIdToBeDeleted) {
      this._teacherService.delete(this.userIdToBeDeleted).subscribe({
        next: res => {
          this.loadTeacher();
        },
        error: err => {
          alert(err.error.message ?? err.error ?? "Unexpected Error");
        }

      })


    }
  }
}

