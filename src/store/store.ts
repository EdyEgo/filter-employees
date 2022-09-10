import { configureStore } from "@reduxjs/toolkit";
import tablesFiltersReducer from "./tablesFilters";
import tableDataReducer from "./tableData";

export const store = configureStore({
  reducer: {
    tablesFilters: tablesFiltersReducer,
    tableData: tableDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // not showing non-serializable warnings
    }),
});
