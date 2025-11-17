import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
    apiUrl: string = "https://localhost:44303/api/Lookups"

  constructor(private _http: HttpClient) { }



  getByMajorCode(MajorCode: number) {
    let params = new HttpParams();
    params = params.set("MajorCode", MajorCode)
    return this._http.get(this.apiUrl + "/GetByMajorCode", { params });

  }


}
 