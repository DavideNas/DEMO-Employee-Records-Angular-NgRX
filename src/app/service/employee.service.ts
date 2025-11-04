import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl='http://localhost:3000/employee'

  constructor(private http:HttpClient) { }

  GetAllEmployeesService() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  GetEmployeeByIdService(empId:number) {
    return this.http.get<Employee>(this.apiUrl+"/"+empId);
  }

  CreateNewEmployeeService(data:Employee) {
    return this.http.post(this.apiUrl,data);
  }

  UpdateEmployeeService(data:Employee) {
    return this.http.put(this.apiUrl+"/"+data.id,data);
  }

  DeleteEmployeeService(empId:number) {
    return this.http.delete(this.apiUrl+"/"+empId);
  }
}
