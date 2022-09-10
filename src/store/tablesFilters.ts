import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  filterTableDataBy:
    | "averageEmployeesDepartmentSalary"
    | "simpleEmployeesTableList";
} = {
  filterTableDataBy: "simpleEmployeesTableList",
};

export const tableFiltersSlice = createSlice({
  name: "tableFilters",
  initialState,
  reducers: {
    changeFilterByType(state, { payload }) {
      const filterTableBy:
        | "averageEmployeesDepartmentSalary"
        | "simpleEmployeesTableList" = payload.filterTableBy;
      state.filterTableDataBy = filterTableBy;
    },
  },
});

export const { changeFilterByType } = tableFiltersSlice.actions;

export default tableFiltersSlice.reducer;
