import { createSelector } from "@reduxjs/toolkit";

const selectBills = (state) => state.bills.items;
const selectCategory = (state) => state.bills.selectedCategory;

export const selectFilteredBills = createSelector(
  [selectBills, selectCategory],
  (bills, category) =>
    category === "all"
      ? bills
      : bills.filter(
          (bill) => bill.category.toLowerCase() === category.toLowerCase()
        )
);

export const selectTotalAmount = createSelector(
  [selectFilteredBills],
  (bills) => bills.reduce((sum, bill) => sum + Number(bill.amount), 0)
);
