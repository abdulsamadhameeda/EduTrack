import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParentInterface } from '../interfaces/parent-interface';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  apiUrl: string = "https://localhost:44303/api/Parents"


  constructor(private _http: HttpClient) { }



  GetParentByUserId(userId: number) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    let params = new HttpParams().set("userId", userId.toString());
    return this._http.get(this.apiUrl + "/GetByUserId", { params, headers });
  }

  GetAll() {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetAll", { headers });
  }
  GetAllParent() {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.get(this.apiUrl + "/GetAllParent", { headers });
  }
  add(parent: any) {

    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.post(this.apiUrl + "/Add", parent, { headers });


  }
  update(parent: ParentInterface) {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };

    return this._http.put(this.apiUrl + "/Update", parent, { headers });


  }
  delete(id: number) {
    let params = new HttpParams();
    params = params.set("Id", id);
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': `Bearer ${token}` };
    return this._http.delete(this.apiUrl + "/Delete", { params, headers });


  }
}
