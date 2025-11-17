import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'https://localhost:44303/api/Auth';
  constructor(private _http: HttpClient) {
  }


  login(loginForm: any) {

    return this._http.post(this.apiUrl + "/Login", loginForm)

  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // .NET uses long claim names
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        || payload['role']
        || payload['Role'];
    // console.log('User Role from token:', role); 

      return role || null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }


  getUserId(): number | null {
    let token = localStorage.getItem('token');
    if (!token) return null;

    try {
      let payload = JSON.parse(atob(token.split('.')[1]));
      // لاحظ إن الـ NameIdentifier عندك من namespace xmlsoap
      let idStr = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return idStr ? +idStr : null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }


  isParent(): boolean {
    return this.getUserRole() === 'Parent';
  }

  isTeacher(): boolean {
    return this.getUserRole() === 'Teacher';
  }
  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
  logout() {
    localStorage.removeItem('token');
  }


}
