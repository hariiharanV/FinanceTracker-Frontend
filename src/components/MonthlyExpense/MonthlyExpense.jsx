import React, { useState } from 'react';
import DisplayCollapseMessage from './DisplayCollapseMessage';
import MonthlyIncome from './MonthlyIncome';
import ExpenditureData from './ExpenditureData';
import SavingsData from './SavingsData';
import ExpenseTableData from './ExpenseTableData';

const MonthlyExpense = ({ expensesList, title, currentYear, setEditExpenseData, setIsEditModelOpen, setExpenseModified, setMonthlyIncomeAdded, monthlyIncomeAdded, setMonthlyIncome, monthlyIncome }) => {
  const [monthlyIncomeDummy, setMonthlyIncomeDummy] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');

  const showSavings = () => expensesList.length > 0 && monthlyIncome;

  return (
    <div className="flex flex-col mx-auto px-4 md:px-8">
      {/* Collapse to display message */}
      {expensesList.length === 0 && <DisplayCollapseMessage expensesList={expensesList} title={title} monthlyIncome={monthlyIncome} />}

      {/* Income, Expenditure & Savings Section */}
      <div className="flex flex-col md:flex-row border rounded-xl mt-3 mb-3 mx-auto bg-orange-100 items-center p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Monthly Income */}
        <div className="w-full md:w-auto">
          <MonthlyIncome
            title={title}
            setMonthlyIncome={setMonthlyIncome}
            setMonthlyIncomeAdded={setMonthlyIncomeAdded}
            monthlyIncome={monthlyIncome}
            currentYear={currentYear}
            monthlyIncomeDummy={monthlyIncomeDummy}
            setMonthlyIncomeDummy={setMonthlyIncomeDummy}
          />
        </div>

        {/* Expenditure Data */}
        {expensesList.length > 0 && (
          <div className="w-full md:w-auto">
            <ExpenditureData setMonthlySavings={setMonthlySavings} expensesList={expensesList} monthlyIncome={monthlyIncome} />
          </div>
        )}

        {/* Savings Data */}
        {showSavings() && (
          <div className="w-full md:w-auto">
            <SavingsData title={title} expensesList={expensesList} monthlySavings={monthlySavings} />
          </div>
        )}
      </div>

      {/* Expense Table Data */}
      {expensesList.length > 0 && (
        <ExpenseTableData
          expensesList={expensesList}
          setEditExpenseData={setEditExpenseData}
          setIsEditModelOpen={setIsEditModelOpen}
          setExpenseModified={setExpenseModified}
        />
      )}
    </div>
  );
};

export default MonthlyExpense;
