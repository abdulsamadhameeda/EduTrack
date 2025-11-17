import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  apiUrl: string = 'https://localhost:44303/api/Assignments';

  constructor(private _http: HttpClient) { }


  getAll() {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + '/GetAll', { headers });
  }


  add(payload: any) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.post(this.apiUrl + '/Add', payload, { headers });
  }


  getAssignmentsByStudentId(studentId: number) {
    let params = new HttpParams();
    params = params.set("studentId", studentId.toString());
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetByStudentId", { params, headers });
  }

}
