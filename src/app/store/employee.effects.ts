import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  emptyAction,
  loadEmployee,
  loadEmployeeError,
  loadEmployeeSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from './employee.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class empEffect {
  actions$ = inject(Actions);
  service = inject(EmployeeService);
  toastr = inject(ToastrService);

  _loadEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.service.GetAllEmployeesService().pipe(
          map((data) => {
            return loadEmployeeSuccess({ list: data });
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  _deleteEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.service.DeleteEmployeeService(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteEmployeeSuccess({ empId: action.empId }),
              this.showAlert('Deleted Successfully.', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  _addEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      switchMap((action) => {
        return this.service.CreateNewEmployeeService(action.data).pipe(
          switchMap((data) => {
            return of(
              addEmployeeSuccess({ data: action.data }),
              this.showAlert('Created Successfully.', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  _updateEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      switchMap((action) => {
        return this.service.UpdateEmployeeService(action.data).pipe(
          switchMap((data) => {
            return of(
              updateEmployeeSuccess({ data: action.data }),
              this.showAlert('Updated Successfully.', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  showAlert(message: string, response: string) {
    if ((response = 'pass')) {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
    return emptyAction();
  }
}
