import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl="https://localhost:7071"; // class member cannot have const type
  //yha py hummy http client inject krna pry ga js ki help sy server api cl kry gy
  http=inject(HttpClient);

  constructor() { }
  getAllEmployee(){
    //yh api return kry ge iemployee array add url of api https://localhost:7071 yh seerver url h esko var m store kr lety h
    return this.http.get<IEmployee[]>(this.apiUrl +'/api/Employee');
  }
  createEmployee(employee:IEmployee){
    return this.http.post(this.apiUrl+'/api/Employee',employee);

  }
  getEmployee(employeeId:number){
    //yh api return kry ge iemployee array add url of api https://localhost:7071 yh seerver url h esko var m store kr lety h
    return this.http.get<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId);
  }
 updateEmployee(employeeId:number,employee:IEmployee){
    //yh api return kry ge iemployee array add url of api https://localhost:7071 yh seerver url h esko var m store kr lety h
return this.http.put<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId,employee);
  }
  deleteEmployee(employeeId:number){
    //yh api return kry ge iemployee array add url of api https://localhost:7071 yh seerver url h esko var m store kr lety h
    return this.http.delete(this.apiUrl + '/api/Employee/'+employeeId);
  }
}
