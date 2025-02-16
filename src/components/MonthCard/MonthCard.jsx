import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { monthCardData } from "../../../public/assets/assets";
import { motion } from "framer-motion";
import OverallPieChart from "../Reports/OverallPieChart";
import ExpenseByPersonPieChart from "../Reports/ExpenseByPersonPieChart";
import { AppContext } from "../../context/AppContext";
import MonthlyPieChart from "../Reports/MonthlyPieChart";
import OverallInvestmentChart from "../Reports/OverallInvestmentChart";

const MonthCard = ({ setTitle, title, currentYear }) => {
  const navigate = useNavigate();
  const [showMonthCard, setShowMonthCard] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showMonthlyPieChart, setShowMonthlyPieChart] = useState(false);

  const { isChartEmpty, setIsChartEmpty } = useContext(AppContext);

  const ExpenseHandler = (month) => {
    sessionStorage.setItem("month", month);
    navigate("/financeTracker/monthlyExpense");
    setTitle(month);
  };

  const InvestHandler = (month) => {
    sessionStorage.setItem("month", month);
    navigate("/financeTracker/monthlyInvestments");
    setTitle(month);
  };

  useEffect(() => {
    setShowMonthCard(false);
    setTimeout(() => {
      setShowMonthCard(true);
      setAnimationKey((prev) => prev + 1);
    }, 100);
    setIsChartEmpty(false);
  }, [currentYear]);

  const pieChartHandler = (month) => {
    setShowMonthlyPieChart(true);
    setTitle(month);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      {!isChartEmpty && (
        <>
        <div className="flex flex-col sm:flex-row  gap-4 items-center mb-3 md:overflow-hidden overflow-x-auto">
          <OverallPieChart currentYear={currentYear} />
          <ExpenseByPersonPieChart year={currentYear} />
        </div>
        <div className="flex flex-row justify-center items-center">
          <OverallInvestmentChart currentYear={currentYear}/>
        </div> 
        </>
      )}

      

      {showMonthCard && (
  <div className="w-full sm:h-auto md:overflow-x-hidden">
    <div className="flex flex-col md:flex-row gap-3 p-3 w-full overflow-y-auto h-[500px] md:h-auto md:overflow-x-auto">
      {monthCardData.map((monthCard, index) => (
        <motion.div
          key={`${animationKey}-${index}`}
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-base-100  sm:w-28 md:w-72 shadow-xl my-2 flex-shrink-0 rounded-lg p-3 snap-center"
        >
          <div className="border rounded-t-2xl overflow-hidden">
            <img src={monthCard.src} alt={monthCard.title} className="w-full" />
          </div>

          <div className="h-16 flex flex-row justify-between items-center">
            <p className="text-xs sm:text-lg md:text-sm text-sky-900 w-3/4">
              {monthCard.message}
            </p>
            <button
              onClick={() => pieChartHandler(monthCard.title)}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <img src="pieChart.svg" className="w-6 sm:w-6" alt="Pie Chart" />
            </button>
          </div>

          <MonthlyPieChart
            showMonthlyPieChart={showMonthlyPieChart}
            currentYear={currentYear}
            setShowMonthlyPieChart={setShowMonthlyPieChart}
            title={title}
          />

          <div className="flex justify-between mt-2">
            <button
              className="btn btn-accent sm:px-2 md:px-3 sm:text-sm md:text-sm"
              onClick={() => ExpenseHandler(monthCard.title)}
            >
              Expenses
            </button>
            <button
              className="btn btn-primary text-gray-800 px-1 sm:px-2 md:px-3 sm:text-sm md:text-sm"
              onClick={() => InvestHandler(monthCard.title)}
            >
              Investments
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default MonthCard;
