import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from '../interfaces/student-interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl: string = "https://localhost:44303/api/Students"

  constructor(private _http: HttpClient) { }



  getAll(searchObj: any) {
    let params = new HttpParams();
    params = params.set("GradeLevelId", searchObj.GradeLevelId ?? "");
    params = params.set("ClassId", searchObj.ClassId ?? "");
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetAll", { params, headers });
  }
  getAllWithoutFilter() {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetAll", { headers });
  }
  GetById(Id: number) {
    let params = new HttpParams();
    params = params.set("Id", Id.toString());
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetById", { params, headers });
  }

  add(student: any) {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.post(this.apiUrl + "/Add", student, { headers });



  }
  update(student: StudentInterface) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };

    return this._http.put(this.apiUrl + "/Update", student, { headers });


  }

  delete(id: number) {
    let params = new HttpParams();
    params = params.set("Id", id);
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.delete(this.apiUrl + "/Delete", { params, headers });


  }
}
