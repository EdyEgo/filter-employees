export interface simpleEmployeesTableList {
  id:
    | "firstName"
    | "lastName"
    | "cnp"
    | "role"
    | "salary"
    | "offDays"
    | "departamentDescription";

  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface averageEmployeesDepartmentSalary {
  id: "departmentName" | "averageEmployeeSalary" | "departamentDescription";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
