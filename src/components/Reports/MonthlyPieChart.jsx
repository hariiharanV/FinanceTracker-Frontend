import { useContext, useEffect, useState, useRef } from "react";
import PersonalFinanceChart from "./PersonalFinanceChart";
import { toast } from "react-toastify";
import { fetchIncomeByMonthYearAndUser } from "../../incomeApi";
import { AppContext } from "../../context/AppContext";
import ExpenseByPersonMonthlyChart from "./ExpenseByPersonMonthlyChart";

const MonthlyPieChart = ({ showMonthlyPieChart, currentYear, setShowMonthlyPieChart, title }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="modal" role="dialog" open={showMonthlyPieChart}>
        <div className="modal-box w-full max-w-lg md:max-w-5xl bg-slate-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-orange-400">{title} Chart</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setShowMonthlyPieChart(false)}
            >
              ✕
            </button>
          </div>

          {/* Responsive Chart Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PersonalFinanceChart
              showMonthlyPieChart={showMonthlyPieChart}
              currentYear={currentYear}
              setShowMonthlyPieChart={setShowMonthlyPieChart}
              title={title}
            />

            <ExpenseByPersonMonthlyChart
              showMonthlyPieChart={showMonthlyPieChart}
              currentYear={currentYear}
              setShowMonthlyPieChart={setShowMonthlyPieChart}
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPieChart;
