import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Assignment } from '../interfaces/assignment-interfaces';



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

  delete(Id: number) {
    let params = new HttpParams();
    params = params.set("Id", Id.toString());
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.delete(this.apiUrl + "/Delete", { params, headers });
  }

  Update(assignment:Assignment){
   let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };

    return this._http.put(this.apiUrl + "/Update", assignment, { headers });

  }
}
