import { INITIAL_BILLS, INITIAL_MONTHLY_BUDGET } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: INITIAL_BILLS,
  monthlyBudget: INITIAL_MONTHLY_BUDGET,
  selectedCategory: "all",
  isLoading: false,
  error: null,
};
const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {},
});

export default billsSlice.reducer;
