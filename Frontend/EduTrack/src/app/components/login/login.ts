import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  showerrormessage: boolean = false
  errormessage: string = ''
  constructor(private _AuthService: AuthService,
    private _router: Router
  ) { }

  loginForm = new FormGroup({
    Username: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required])
  })
  

  login() {
    let loginObj = {
      UserName: this.loginForm.value.Username,
      Password: this.loginForm.value.Password
    }

    this._AuthService.login(loginObj).subscribe({

      next: (res: any) => {
        localStorage.setItem("token", res.token);
        this.showerrormessage = false;

        let role = this._AuthService.getUserRole();

        if (role === 'Teacher') {
          this._router.navigate(['/teacher']);
        } else if (role === 'Parent') {
          this._router.navigate(['/parent']);
        } else if (role === 'Admin') {
          this._router.navigate(['/admin']); // توجيه للـ Admin
        } else {
          this._router.navigate(['/login']);
        }

      },

      error: err => {
        this.showerrormessage = true;
        this.errormessage = err.error.message ?? err.error ?? "Unexpected Error";
      }

    })

  }


}
