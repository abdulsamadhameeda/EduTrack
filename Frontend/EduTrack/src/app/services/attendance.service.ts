import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceInterface } from '../interfaces/attendance-interface';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  apiUrl: string = "https://localhost:44303/api/Attendances"

  constructor(private _http: HttpClient) { }





  GetByStudentId(studentId: number) {
    let params = new HttpParams();
    params = params.set("studentId", studentId.toString());
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetByStudentId", { params,headers });
  }

  add(Attendance: any) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.post(this.apiUrl + "/Add", Attendance ,{headers});
  }



}
