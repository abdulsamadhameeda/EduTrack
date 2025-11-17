import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherInterface } from '../interfaces/teacher-interface';



@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  apiUrl: string = "https://localhost:44303/api/Teachers"


  constructor(private _http: HttpClient) { }


  // GetTeacher(TeacherId: number) {
  //   let params = new HttpParams();
  //   params = params.set("Id", TeacherId.toString());
  //   return this._http.get(this.apiUrl + "/GetById" , {params})
  // }

  // ✅ الطريقة الجديدة: تجيب المعلم بناءً على الـ UserId
  GetTeacherByUserId(userId: number) {
    let params = new HttpParams();
    params = params.set("userId", userId.toString());
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetByUserId", { params, headers });
  }

  GetAll() {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetAll", { headers });
  }


  add(teacher: any) {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.post(this.apiUrl + "/Add", teacher, { headers });

  }
  update(teacher: TeacherInterface) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };

    return this._http.put(this.apiUrl + "/Update", teacher, { headers });


  }
  delete(id: number) {
    let params = new HttpParams();
    params = params.set("Id", id);
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.delete(this.apiUrl + "/Delete", { params, headers });


  }
}


