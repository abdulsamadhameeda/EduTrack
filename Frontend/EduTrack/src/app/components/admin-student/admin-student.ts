import { Component, ElementRef, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentInterface } from '../../interfaces/student-interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListInterface } from '../../interfaces/list-interface';
import { ParentInterface } from '../../interfaces/parent-interface';
import { TeacherInterface } from '../../interfaces/teacher-interface';
import { LookupService } from '../../services/lookup.service';
import { ParentService } from '../../services/parent.service';
import { TeacherService } from '../../services/teacher.service';
import { LookupsMajorCodes } from '../../enums/lookups-major-codes';
import { ConfirmationDialog } from "../../shared-component/confirmation-dialog/confirmation-dialog";

@Component({
  selector: 'app-admin-student',
  imports: [FormsModule, ReactiveFormsModule, ConfirmationDialog],
  templateUrl: './admin-student.html',
  styleUrl: './admin-student.css'
})
export class AdminStudent {
  @ViewChild('closeButton') closeButton: ElementRef | undefined;

  constructor(private _StudentService: StudentService,
    private _lookupService: LookupService,
    private _ParentService: ParentService,
    private _TeacherService: TeacherService,
  ) {

  }

  students: StudentInterface[] = []
  gradeLevel: ListInterface[] = []
  class: ListInterface[] = []
  parent: ParentInterface[] = []
  teacher: TeacherInterface[] = []
  parentAll: ParentInterface[] = []

  SaveStudentForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    GradeLevelId: new FormControl(null, [Validators.required]),
    ClassId: new FormControl(null, [Validators.required]),
    ParentId: new FormControl(null, [Validators.required]),
    TeacherId: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required])
  })


  StudentTableColumns: string[] = [
    '#',
    'Name',
    'grade level',
    'class',
    'Teacher',
    'parent'
  ];


  ngOnInit() {

    this.loadstudent();
    this.loadClass();
    this.loadGradeLevel();
    this.loadParents()
    this.loadTeachers()
    this.loadALLParents()


  }



  loadstudent() {
    this.students = [];


    this._StudentService.getAllWithoutFilter().subscribe({

      next: (res: any) => { // succesful request 

        if (res?.length > 0) {
          res.forEach((x: any) => {
            let student: StudentInterface = {
              id: x.id,
              name: x.name,
              class: x.class,
              gradeLevel: x.gradeLevel,
              gradeLevelId: x.gradeLevelId,
              classId: x.classId,
              teacherName: x.teacherName,
              teacherId: x.teacherId,
              parentId: x.parentId,
              parentName: x.parentName




            };
            console.log(res)
            this.students.push(student);

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

  loadParents() {

    this.parent = [{ id: null, name: "Select parent", phone: null, email: null }]

    this._ParentService.GetAll().subscribe({
      next: (res: any) => {
        this.parent = [{ id: null, name: "Select parent", phone: 0, email: null, studentId: null }, ...res];


      },
      error: err => {
        console.error('Error loading parents', err)


      }
    });
  }
  loadALLParents() {

    this.parentAll = [{ id: null, name: "Select parent", phone: null, email: null }]

    this._ParentService.GetAllParent().subscribe({
      next: (res: any) => {
        this.parentAll = [{ id: null, name: "Select parent", phone: 0, email: null, studentId: null }, ...res];


      },
      error: err => {
        console.error('Error loading parents', err)


      }
    });
  }
  loadTeachers() {

    this.teacher = [{ id: null, name: "Select teacher", phone: null, email: null }]

    this._TeacherService.GetAll().subscribe({
      next: (res: any) => {
        this.teacher = [{ id: null, name: "Select teacher" }, ...res];


      },
      error: err => {
        console.error('Error loading parents', err)


      }
    });
  }


  editUser(id: number) {
    let student = this.students.find((x) => x.id == id);

    if (student != null) {
      this.SaveStudentForm.patchValue({
        id: student?.id,
        Name: student?.name,
        GradeLevelId: student?.gradeLevelId,
        ClassId: student?.classId,
        TeacherId: student?.teacherId,
        ParentId: student?.parentId
      });

      this.SaveStudentForm.get('ParentId')?.disable();

    }
    console.log(this.SaveStudentForm.value)
  }







  // addStudent() {

  //   let StudentId = this.SaveStudentForm.value.id ?? 0;


  //   if (this.SaveStudentForm.invalid) {
  //     this.SaveStudentForm.markAllAsTouched();
  //     return;
  //   }
  // const formValues = this.SaveStudentForm.getRawValue();

  //   let student = {
  //     id: StudentId,
  //     name: this.SaveStudentForm.value.Name,
  //     gradeLevelId: this.SaveStudentForm.value.GradeLevelId,
  //     classId: this.SaveStudentForm.value.ClassId,
  //     parentId: this.SaveStudentForm.value.ParentId,
  //     teacherId: this.SaveStudentForm.value.TeacherId
  //   };


  //   if (!this.SaveStudentForm.value.id) {
  //     this._StudentService.add(student).subscribe({
  //       next: (res: any) => {
  //         alert('Student added successfully!');
  //         this.SaveStudentForm.reset();
  //      this.SaveStudentForm.get('ParentId')?.enable(); // 🔹 تفعيل الحقل من جديد

  //         this.loadParents()
  //         this.loadstudent()
  //       },
  //       error: err => {
  //         console.error(err);
  //         alert('Error adding student');
  //       }
  //     });

  //   } else {
  //     this._StudentService.update(student).subscribe({
  //       next: res => {
  //         alert('Student Update successfully!');
  //     this.SaveStudentForm.get('ParentId')?.enable(); // 🔹 تفعيل الحقل بعد التعديل

  //         this.loadstudent();
  //       },
  //       error: err => {
  //         const msg = err?.error?.message ?? err?.message ?? "Unexpected error occurred.";
  //         alert(msg);
  //       }


  //     })


  //   }




  // }


  addStudent() {
    // نأخذ جميع القيم حتى لو كان بعض الحقول معطّلة
    const formValues = this.SaveStudentForm.getRawValue();

    // إذا الفورم غير صالح، نوقف العملية
    if (this.SaveStudentForm.invalid) {
      this.SaveStudentForm.markAllAsTouched();
      return;
    }

    // تجهيز بيانات الطالب
    const student = {
      id: formValues.id ?? 0,
      name: formValues.Name,
      gradeLevelId: formValues.GradeLevelId,
      classId: formValues.ClassId,
      parentId: formValues.ParentId,
      teacherId: formValues.TeacherId
    };

    // 🔹 إضافة طالب جديد
    if (!formValues.id) {
      this._StudentService.add(student).subscribe({
        next: (res: any) => {
          alert('Student added successfully!');
          this.SaveStudentForm.reset();
          this.SaveStudentForm.get('ParentId')?.enable(); // إعادة التفعيل بعد الإضافة
          this.loadParents();
          this.loadstudent();
        },
        error: err => {
          console.error(err);
          alert('Error adding student');
        }
      });
    }
    // 🔹 تعديل طالب موجود
    else {
      this._StudentService.update(student).subscribe({
        next: res => {
          alert('Student updated successfully!');
          this.SaveStudentForm.get('ParentId')?.enable(); // تفعيل الحقل بعد التعديل
          this.loadstudent();
        },
        error: err => {
          const msg = err?.error?.message ?? err?.message ?? "Unexpected error occurred.";
          alert(msg);
        }
      });
    }



    this.closeButton?.nativeElement.click();
    this.restForm()
  }

  restForm() {
    this.SaveStudentForm.reset()
    this.SaveStudentForm.get('ParentId')?.enable(); // 🔹 تأكد إنه مفعّل

    this.loadParents()

  }

  // --------------

  deleteDialogTitle: string = 'Delete';
  deleteDialogBody: string = 'are you sure for delete this Student?';
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
      this._StudentService.delete(this.userIdToBeDeleted).subscribe({
        next: res => {
          this.loadstudent();
          this.loadParents()
        },
        error: err => {
          alert(err.error.message ?? err.error ?? "Unexpected Error");
        }

      })


    }
  }
}
