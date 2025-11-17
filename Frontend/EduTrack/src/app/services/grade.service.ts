import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  apiUrl: string = "https://localhost:44303/api/Grades"


  constructor(private _http: HttpClient) { }



  add(payload: any) {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };

    return this._http.post(this.apiUrl + "/Add", payload, { headers });

  }



  GetByStudentId(studentId: number) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    let params = new HttpParams();
    params = params.set("studentId", studentId.toString());
    return this._http.get(this.apiUrl + "/GetByStudentId", { params, headers });


  }



}
