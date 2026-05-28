import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addEmployee, getEmployee, updateEmployee } from '../../store/employee.action';
import { selectEmployee } from '../../store/employee.selector';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatDatepickerModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent implements OnInit{
  
  title='Add Employee'
  dialogData: any;
  isEdit=false;
  
  // constructor (private service:EmployeeService, private ref:MatDialogRef<AddEmployeeComponent>, private toastr:ToastrService, @Inject(MAT_DIALOG_DATA) public data:any) { }
  constructor (private store: Store, private ref:MatDialogRef<AddEmployeeComponent>, private toastr:ToastrService, @Inject(MAT_DIALOG_DATA) public data:any) { }

  empForm= new FormGroup({
    id:new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date, Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  })
  saveEmployee() {
    if(this.empForm.valid) {
      let _data:Employee={
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: this.empForm.value.doj as Date,
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      }

      if(this.isEdit) {
        // this.service.UpdateEmployeeService(_data).subscribe(item=>{
        //   this.toastr.success("Employee saved successfully","Updated");
        //   this.closepopup();
        // });
        this.store.dispatch(updateEmployee({data:_data}));
      } else {
        // this.service.CreateNewEmployeeService(_data).subscribe(item=>{
          //   this.toastr.success("Employee saved successfully","Created");
          //   this.closepopup();
          // });
        this.store.dispatch(addEmployee({data:_data}));
      }
      this.closepopup();
    }
  }

  closepopup() {
    this.ref.close()
  }

  ngOnInit(): void {
    this.dialogData=this.data;
    if(this.dialogData.code>0)
    {
      this.title="Edit Employee";
      this.isEdit=true;
      this.store.dispatch(getEmployee({empId:this.dialogData.code}));
      this.store.select(selectEmployee).subscribe(item => {
        let _data=item;
        if(_data!=null) {
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary,
          })
        }
      })
      // this.service.GetEmployeeByIdService(this.dialogData.code).subscribe(item => {
      //   let _data=item;
      //   if(_data!=null) {
      //     this.empForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       doj: _data.doj,
      //       role: _data.role,
      //       salary: _data.salary,
      //     })
      //   }
      // })
    }
  }

}
