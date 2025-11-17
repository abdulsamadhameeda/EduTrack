import { Component, ElementRef, ViewChild } from '@angular/core';
import { ParentInterface } from '../../interfaces/parent-interface';
import { ParentService } from '../../services/parent.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialog } from "../../shared-component/confirmation-dialog/confirmation-dialog";

@Component({
  selector: 'app-admin-parent',
  imports: [FormsModule, ReactiveFormsModule, ConfirmationDialog],
  templateUrl: './admin-parent.html',
  styleUrl: './admin-parent.css'
})
export class AdminParent {
  @ViewChild('closeButton') closeButton: ElementRef | undefined;

  constructor(private _parentService: ParentService) { }

  parents: ParentInterface[] = []

  parentTableColumns: string[] = [
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

    this.loadParent()
  }

  loadParent() {

    this.parents = []
    this._parentService.GetAllParent().subscribe({

      next: (res: any) => { // succesful request 

        if (res?.length > 0) {
          res.forEach((x: any) => {
            let Parent: ParentInterface = {
              id: x.id,
              name: x.name,
              email: x.email,
              phone: x.phone

            };
            this.parents.push(Parent);

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
    let parent = this.parents.find((x) => x.id == id);

    if (parent != null) {
      this.SaveUserForm.patchValue({
        id: parent?.id,
        name: parent?.name,
        phone: parent?.phone,
        email: parent?.email

      });
    }
  }
  addParent() {
    let ParentId = this.SaveUserForm.value.id ?? 0;

    if (this.SaveUserForm.invalid) {
      this.SaveUserForm.markAllAsTouched();
      return;
    }

    let parent = {
      id: ParentId,
      name: this.SaveUserForm.value.name,
      email: this.SaveUserForm.value.email,
      phone: this.SaveUserForm.value.phone,

    };
    if (!this.SaveUserForm.value.id) {
      this._parentService.add(parent).subscribe({
        next: (res: any) => {
          alert('Parent added successfully!');
          this.loadParent()
          this.SaveUserForm.reset();

        },
        error: err => {
          console.error(err);
          alert('Error adding Parent');
        }
      });

    } else {
      this._parentService.update(parent).subscribe({
        next: res => {
          alert('parent Update successfully!');
          this.loadParent();
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
  deleteDialogBody: string = 'are you sure for delete this Parent?';
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
      this._parentService.delete(this.userIdToBeDeleted).subscribe({
        next: res => {
          this.loadParent();
        },
        error: err => {
          alert(err.error.message ?? err.error ?? "Unexpected Error");
        }

      })


    }
  }
}
