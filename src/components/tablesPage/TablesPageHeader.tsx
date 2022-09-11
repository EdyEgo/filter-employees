import ButtonSelect from "../ui/SelectButton";
import { changeFilterByType } from "../../store/tablesFilters";
import { useDispatch, useSelector } from "react-redux";
interface TablesPageHeaderProps {}

const TablesPageHeader: React.FC<TablesPageHeaderProps> = () => {
  const dispatch = useDispatch();

  const filterTableDataBy = useSelector(
    (state: any) => state.tablesFilters.filterTableDataBy
  );
  function changeTablesFilterBy(
    filterTableBy:
      | "averageEmployeesDepartmentSalary"
      | "simpleEmployeesTableList"
      | string
      | boolean
  ) {
    dispatch(changeFilterByType({ filterTableBy }));
  }

  const newStateToSelect =
    filterTableDataBy === "averageEmployeesDepartmentSalary"
      ? "simpleEmployeesTableList"
      : "averageEmployeesDepartmentSalary";

  return (
    <div className="tables-page-header-container flex justify-center mt-20 ">
      <div className="select-filter-type-btns-container flex flex-wrap gap-10 justify-between">
        <ButtonSelect
          buttonName="Average Employees Salary Per Department"
          buttonState={filterTableDataBy === "averageEmployeesDepartmentSalary"}
          newState={newStateToSelect}
          setNewButtonState={changeTablesFilterBy}
        />
        <ButtonSelect
          buttonName="Simple Employees Table list"
          setNewButtonState={changeTablesFilterBy}
          newState={newStateToSelect}
          buttonState={filterTableDataBy === "simpleEmployeesTableList"}
        />
      </div>
    </div>
  );
};

export default TablesPageHeader;
