import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { monthCardData } from "../../../public/assets/assets";
import { motion } from "framer-motion";
import OverallPieChart from "../Reports/OverallPieChart";
import ExpenseByPersonPieChart from "../Reports/ExpenseByPersonPieChart";
import { AppContext } from "../../context/AppContext";
import MonthlyPieChart from "../Reports/MonthlyPieChart";


const MonthCard = ({ setTitle,title, currentYear }) => {
  const navigate = useNavigate();
  const [showMonthCard,setShowMonthCard] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showMonthlyPieChart, setShowMonthlyPieChart] = useState(false)

  const {isChartEmpty,setIsChartEmpty} = useContext(AppContext);


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
    console.log('shwoing monthcard')
    setShowMonthCard(false); // Reset animation
    setTimeout(() => {
      setShowMonthCard(true);
      setAnimationKey((prev) => prev + 1); // Change key to re-trigger animation
    }, 100); // Small delay to ensure animation restarts

    setIsChartEmpty(false);
  }, [currentYear]);

  const pieChartHandler = (month)=>{
    setShowMonthlyPieChart(true);
    setTitle(month)
  }


  return (
   <div className="flex flex-col align-center">


    {/* <Chart currentYear={currentYear} /> */}

   {!isChartEmpty && <div className="flex flex-row gap-4 items-center mb-3 mx-auto overflow-hidden">
      
       <OverallPieChart currentYear={currentYear} /> 

       <ExpenseByPersonPieChart year={currentYear}/>

      </div>}

   
   {showMonthCard && <div className="carousel carousel-end rounded-box bg-#ccbb8b mb-2 mx-4">
    <div className="carousel-item gap-1 border border-none">
        {monthCardData.map((monthCard, index) => (
          <motion.div
            key={`${animationKey}-${index}`} // Unique key forces re-render
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }} // Use `animate` instead of `whileInView`
            transition={{ duration: 1 }}// Transition duration
            // viewport={{ once: true }} // Animation triggers only once
            // key={index} //commented as added new key
            className="bg-base-100 w-80 shadow-xl my-3 flex-shrink-0"
          >
            <div className="border rounded-t-2xl">
              <img src={monthCard.src} alt={monthCard.title} />
            </div>

            <div className="h-16 mx-3 flex flex-row justify-between">
              <p className="text-md text-sky-900">{monthCard.message}</p>
              <button onClick={()=>pieChartHandler(monthCard.title)} className=" transition-transform duration-300 ease-in-out hover:scale-110">
                <img src="pieChart.svg" className="w-8"/>
              </button>
            </div>

             {/* Monthly Pie Chart */}
            <MonthlyPieChart showMonthlyPieChart={showMonthlyPieChart} currentYear={currentYear} setShowMonthlyPieChart={setShowMonthlyPieChart} title={title}/>    

              
              <div className="flex justify-between mx-2 mb-2">
                <button
                  className="btn btn-accent px-4"
                  onClick={() => ExpenseHandler(monthCard.title)}
                >
                  Expenses
                </button>
                <button
                  className="btn btn-primary  text-gray-800 px-3"
                  onClick={() => InvestHandler(monthCard.title)}
                >
                  Investments
                </button>
              </div>

          </motion.div>
        ))}
      </div>
    </div>}

   

    </div> 
  );
};

export default MonthCard;
