import { Component, inject } from '@angular/core';
import { ParentService } from '../../services/parent.service';
import { ParentInterface } from '../../interfaces/parent-interface';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parent',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class Parent {
    auth = inject(AuthService);

  constructor(private _ParentService: ParentService) { }

  parent: ParentInterface | null = null;  // مش مصفوفة



  ngOnInit() {

 
      // this.parentinfo(8)
      const userId = this.auth.getUserId();
    console.log('Parent userId:', userId);

    if (userId) {
      this.getParentInfo(userId);
    }

  }


  // parentinfo(id: number) {

  //   this._ParentService.GetParent(id).subscribe({
  //     next: (res: any) => {

  //       this.parent = res;
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
      },
      error: err => {
        console.log(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }
}



