import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/employee.model';
// import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../store/employee.action';
import { getEmpList } from '../../store/employee.selector';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatCardModule, MatButtonModule,MatDialogModule, MatTableModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList:Employee[]=[];
  dataSource!:MatTableDataSource<Employee>;
  displayedColumns:string[]=['id','name','role','doj','salary','action'];
  subscription = new Subscription();

  constructor(
    private dialog:MatDialog, 
    // private service:EmployeeService,
    private store:Store) { }
  
  ngOnInit(): void {
    this.GetAllEmployees();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetAllEmployees() {
    this.store.dispatch(loadEmployee())
    this.store.select(getEmpList).subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    })
  }
  
  deleteEmployee(empId: number) {
    if(confirm("Are you sure?")) {
      // let sub=this.service.DeleteEmployeeService(empId).subscribe(item => {
      //   this.GetAllEmployees();
      // })
      // this.subscription.add(sub);
      this.store.dispatch(deleteEmployee({ empId: empId }));
    }
  }

  addEmployee() { 
    this.openPopup(0);
  }

  editEmployee(empId: number) {
    this.openPopup(empId);
  }

  openPopup(empId: number) {
    this.dialog.open(AddEmployeeComponent, {
      width:'50%',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data:{ 'code':empId }
    }).afterClosed().subscribe(o=>{
      this.GetAllEmployees();
    }); 
  }
}
