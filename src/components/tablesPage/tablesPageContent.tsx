import TableList from "../ui/tableList";
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

  const [displayErrorMessage, setDisplayErrorMessage] = useState<null | string>(
    null
  );
  const [tableInfo, setTableInfo] = useState<null | {
    columnConfiguration: any;
    rowsData: any;
  }>(null);

  const tableCases: {
    [typeTable: string]: (tableList: any) => {
      columnConfiguration: any;
      rowsData: any;
    };
  } = {
    simpleEmployeesTableList(list: any) {
      function createData({
        cnp,
        departamentDescription,
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
        return {
          firstName,
          lastName,
          cnp,
          role,
          offDays,
          departamentDescription,
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

      return { columnConfiguration, rowsData };
    },
    averageEmployeesDepartmentSalary() {
      return { columnConfiguration: null, rowsData: null };
    },
  };

  async function handleStoreEmployeesList() {
    const { error, data } = await getAllEmployeesApi();

    if (error) {
      setDisplayErrorMessage("Could not get the employees list");

      setTimeout(() => {
        setDisplayErrorMessage(null);
      }, 2000);
      return;
    }
    // add list to localStorage
    const list: any = data;

    setTableInfo(tableCases[filterTableDataBy](list));
    dispatch(addEmployeeTableList(data));
  }

  const tableInfos = tableCases[filterTableDataBy](employeesList);

  useEffect(() => {
    if (employeesList.length <= 0) {
      handleStoreEmployeesList();
    }
  }, []);

  console.log("my employee list ", employeesList, tableInfo);
  return (
    <div className="table-list-content-container">
      {/* {tableInfo != null && (
        <TableList
          columns={tableInfo.columnConfiguration}
          rows={tableInfo.rowsData}
        />
      )} */}
      {tableInfos != null && (
        <TableList
          columns={tableInfos.columnConfiguration}
          rows={tableInfos.rowsData}
        />
      )}
    </div>
  );
};

export default TablesPageContentContainer;
