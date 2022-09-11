import TableList from "../ui/tableList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import type {
  averageEmployeesDepartmentSalary,
  simpleEmployeesTableList,
} from "../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  addDepartmentsTableList,
  addEmployeeTableList,
} from "../../store/tableData";
import {
  getAllDepartments,
  getAllEmployees as getAllEmployeesApi,
} from "../../api/getMethods";
interface TablesPageContentContainerProps {}

const TablesPageContentContainer: React.FC<
  TablesPageContentContainerProps
> = () => {
  // salary is just a number we don t know from the datase if it is in euro or in other currency

  const DEFAULT_CURRENCY = "lei";
  const dispatch = useDispatch();
  const employeesList = useSelector(
    (state: any) => state.tableData.employeeTableList
  );

  const deparmentsList = useSelector(
    (state: any) => state.tableData.deparmentsTableList
  );

  const filterTableDataBy = useSelector(
    (state: any) => state.tablesFilters.filterTableDataBy
  );

  const [loadingData, setLoadingData] = useState(false);

  const [displayErrorMessage, setDisplayErrorMessage] = useState<null | string>(
    null
  );

  const [
    simpleEmployeesTableColumnsAndRows,
    setSimpleEmployeesTableColumnsAndRows,
  ] = useState<any>(null);
  const [
    averageEmployeesDepartmentSalaryColumnsAndRows,
    setAverageEmployeesDepartmentSalaryColumnsAndRows,
  ] = useState<any>(null);

  const tableCases: {
    [typeTable: string]: (tableList: any) => {
      columnConfiguration: any;
      rowsData: any;
    };
  } = {
    simpleEmployeesTableList(list: any) {
      if (simpleEmployeesTableColumnsAndRows !== null) {
        return simpleEmployeesTableColumnsAndRows;
      }
      function createData({
        cnp,

        firstName,
        id,
        idDepartment,
        lastName,
        offDays,
        role,
        salary,
      }: {
        firstName: string;
        lastName: string;
        cnp: number;
        role: string;
        salary: number;
        offDays: number;
        departamentDescription: string;
        id: number;
        idDepartment: number;
      }) {
        const depatmentDespcriptionById = deparmentsList[idDepartment];

        return {
          firstName,
          lastName,
          cnp,
          role,
          offDays,
          departamentDescription: `${depatmentDespcriptionById.nume}: ${depatmentDespcriptionById.descriere}`,
          salary: `${salary} ${DEFAULT_CURRENCY}`,
          id,
          idDepartment,
        };
      }

      const columnConfiguration: simpleEmployeesTableList[] = [
        { id: "firstName", label: "Nume", minWidth: 120 },
        { id: "lastName", label: "Prenume", minWidth: 120 },
        { id: "cnp", label: "CNP", minWidth: 120 },
        { id: "role", label: "Functie", minWidth: 120 },
        { id: "salary", label: "Salariu", minWidth: 120 },
        { id: "offDays", label: "Zile de concediu", minWidth: 120 },
        {
          id: "departamentDescription",
          label: "Descriere departament",
          minWidth: 140,
          align: "right",
        },
      ];

      const rowsData = list.map((item: any) => createData(item));

      setSimpleEmployeesTableColumnsAndRows({ columnConfiguration, rowsData });
      return { columnConfiguration, rowsData };
    },
    averageEmployeesDepartmentSalary() {
      function createData({
        id,
        descriere,
        nume,
        averageSalaries,
      }: {
        id: number;
        descriere: string;
        nume: string;
        averageSalaries: number;
      }) {
        return {
          id,
          departamentDescription: descriere,
          departmentName: nume,
          averageEmployeeSalary: averageSalaries,
        };
      }

      const columnConfiguration: averageEmployeesDepartmentSalary[] = [
        {
          id: "departmentName",
          label: "Nume departament",
          minWidth: 120,
          align: "right",
        },
        {
          id: "departamentDescription",
          label: "Descriere departament",
          minWidth: 140,
          align: "right",
        },
        {
          id: "averageEmployeeSalary",
          label: "Media Salariilor pe departament",
          minWidth: 120,
          align: "right",
        },
      ];

      function calculateAverageSalaryPerDepartment() {
        const salarysDepartmentsList: {
          [key: string]: { salariesList: number[]; averageSalaries: number };
        } = {};
        // deparmentsList

        // loop through the employees list and add for each index of a department and array with salarys

        if (averageEmployeesDepartmentSalaryColumnsAndRows !== null) {
          return averageEmployeesDepartmentSalaryColumnsAndRows;
        }
        employeesList.forEach(
          ({
            idDepartment,
            salary,
          }: {
            idDepartment: number;
            salary: number;
          }) => {
            if (typeof salarysDepartmentsList[idDepartment] === "object") {
              salarysDepartmentsList[idDepartment].salariesList.push(salary);
              return;
            }

            salarysDepartmentsList[idDepartment] = {
              salariesList: [],
              averageSalaries: 0,
            };
            salarysDepartmentsList[idDepartment].salariesList.push(salary);
          }
        );

        // loop through the salarysDepartmentsList object and calculate the average salary

        Object.entries(salarysDepartmentsList).forEach(
          ([idDeparment, departmentObject]) => {
            const averageSalary =
              departmentObject.salariesList.reduce((a, b) => a + b, 0) /
              departmentObject.salariesList.length;

            salarysDepartmentsList[idDeparment].averageSalaries =
              Math.round(averageSalary);
            salarysDepartmentsList[idDeparment] = {
              ...salarysDepartmentsList[idDeparment],
              ...deparmentsList[idDeparment],
            };
          }
        );
        setAverageEmployeesDepartmentSalaryColumnsAndRows(
          salarysDepartmentsList
        );
        return salarysDepartmentsList;
      }

      const averageSalaryList = calculateAverageSalaryPerDepartment();
      const rows = Object.entries(averageSalaryList).map(
        ([itemId, itemObject]: any) => createData(itemObject)
      );

      return { columnConfiguration, rowsData: rows };
    },
  };

  async function handleStoreEmployeesList() {
    const { error, data } = await getAllEmployeesApi();
    const { error: departmentsError, data: deparmentsData } =
      await getAllDepartments();

    if (error || departmentsError) {
      setDisplayErrorMessage("Could not get the data list from database");

      setTimeout(() => {
        setDisplayErrorMessage(null);
      }, 2000);
      return;
    }
    // add list to localStorage
    const list: any = data;

    dispatch(addEmployeeTableList(data));

    dispatch(addDepartmentsTableList(deparmentsData));
  }

  const tableInfos =
    employeesList.length > 0 && deparmentsList.length > 0
      ? tableCases[filterTableDataBy](employeesList)
      : null;

  useEffect(() => {
    if (employeesList.length <= 0) {
      setLoadingData(true);
      handleStoreEmployeesList().then(() => {
        setLoadingData(false);
      });
    }
  }, []);

  return (
    <div className="table-list-content-container">
      {/* {tableInfo != null && (
        <TableList
          columns={tableInfo.columnConfiguration}
          rows={tableInfo.rowsData}
        />
      )} */}
      {displayErrorMessage != null && (
        <div className="p-5 font-bold table-error-message-container">
          {displayErrorMessage}
        </div>
      )}
      {tableInfos != null && (
        <TableList
          columns={tableInfos.columnConfiguration}
          rows={tableInfos.rowsData}
        />
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default TablesPageContentContainer;
