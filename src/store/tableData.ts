import { createSlice } from "@reduxjs/toolkit";

const initialState: { employeeTableList: any[]; deparmentsTableList: any[] } = {
  employeeTableList: [],
  deparmentsTableList: [],
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addEmployeeTableList(state, { payload }) {
      state.employeeTableList = payload;
    },
    addDepartmentsTableList(state, { payload }) {
      state.deparmentsTableList = payload;
    },
  },
});

export const { addEmployeeTableList, addDepartmentsTableList } =
  tableDataSlice.actions;

export default tableDataSlice.reducer;
