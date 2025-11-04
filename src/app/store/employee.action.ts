import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/employee.model";

export const LOAD_EMPLOYEE="[Employee] Get All"
export const LOAD_EMPLOYEE_SUCCESS="[Employee] Get All Success"
export const LOAD_EMPLOYEE_ERROR="[Employee] Get All Error"

export const DELETE_EMPLOYEE="[Employee] Delete"
export const DELETE_EMPLOYEE_SUCCESS="[Employee] Delete"

export const ADD_EMPLOYEE="[Employee] Add"
export const ADD_EMPLOYEE_SUCCESS="[Employee] Add Success"

export const UPDATE_EMPLOYEE="[Employee] Update"
export const UPDATE_EMPLOYEE_SUCCESS="[Employee] Update Success"

export const GET_EMPLOYEE="[Employee] Get Employee"

export const loadEmployee = createAction(LOAD_EMPLOYEE)
export const loadEmployeeSuccess = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>())
export const loadEmployeeError = createAction(LOAD_EMPLOYEE_ERROR, props<{ errMsg:string }>())

export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{empId:number}>())
export const deleteEmployeeSuccess = createAction(LOAD_EMPLOYEE_SUCCESS, props<{empId:number}>())

export const addEmployee = createAction(ADD_EMPLOYEE, props<{data:Employee}>())
export const addEmployeeSuccess = createAction(ADD_EMPLOYEE_SUCCESS, props<{data:Employee}>())

export const updateEmployee = createAction(UPDATE_EMPLOYEE, props<{data:Employee}>())
export const updateEmployeeSuccess = createAction(UPDATE_EMPLOYEE_SUCCESS, props<{data:Employee }>())

export const getEmployee = createAction(GET_EMPLOYEE, props<{empId:number}>())

export const emptyAction = createAction('empty')