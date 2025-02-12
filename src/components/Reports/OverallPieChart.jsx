import React, { useContext, useEffect , useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppContext } from "../../context/AppContext";
import { fetchExpensesByUserAndYear } from "../../api";
import { fetchInvestmentByUserAndYear } from "../../investApi";
import { fetchIncomeByUserAndYear } from "../../incomeApi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const OverallPieChart = ({currentYear}) => {
  const [chartData, setChartData] = useState([]);
  const {userData} = useContext(AppContext);
  const [totalExpenses,setTotalExpenses] = useState(0);
  const [totalInvestments,setTotalInvestments] = useState(0);
  const [totalSavings,setTotalSavings] = useState(0);

  const {setIsChartEmpty} = useContext(AppContext);

   const loadExpenses = async()=>{

    const username = userData.email;

    const year = currentYear;

    const expense_response = await fetchExpensesByUserAndYear(username,year);

   const total_expenses = expense_response.reduce((sum,expense)=>sum + Number(expense.finalAmountSettled),0);

   setTotalExpenses(total_expenses);

   console.log('Total Expenses is =>'+ total_expenses);

   const invest_response = await fetchInvestmentByUserAndYear(username,year);

   const total_investments = invest_response.reduce((sum,invest)=>sum + Number(invest.amount),0);

   setTotalInvestments(total_investments)

   console.log('Total Investments is =>'+ total_investments);

    const income_response = await fetchIncomeByUserAndYear(username,year);

    const total_income = income_response.reduce((sum,income)=>sum + Number(income.monthlyIncome),0);

    const total_savings = total_income - total_expenses - total_investments;

    setTotalSavings(total_savings);

    console.log('Total Savings is =>'+ total_savings);

    if(total_investments==0 && total_savings ===0 && total_expenses===0)
      {
        console.log('inside empty')
        setChartData([]); 
        setIsChartEmpty(true);
      }

      const newData = [];
      if (total_expenses > 0) newData.push({ name: "Expenses", value: total_expenses });
      if (total_savings > 0) newData.push({ name: "Savings", value: total_savings });
      if (total_investments > 0) newData.push({ name: "Investments", value: total_investments });

      if(newData.length >0)
      {
        setIsChartEmpty(false);
      }

      setTimeout(() => {
        
        setChartData(newData);
        
      }, 200);

  }

  useEffect(() => {

    console.log('running effect bcz of year change'+currentYear)
  
    loadExpenses();

  }, [userData,currentYear]);


  useEffect(()=>{

    loadExpenses()
  },[])

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]; // Custom colors

  return (
    <div className="flex items-center">
    <div className="flex flex-col items-center">
      <PieChart width={420} height={400}>
        <Pie 
          data={chartData} 
          cx="50%" 
          cy="50%" 
          outerRadius={120} 
          fill="#8884d8" 
          dataKey="value" 
          label={({ value }) => `₹${value}`}
          isAnimationActive={true} // ✅ Enables animation
          animationDuration={1000} // ✅ Animation duration (1s)
          animationEasing="ease-out" // ✅ Smooth animation
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>
        <Tooltip />
      </PieChart>

      {chartData.length>0 && <motion.div 
      initial={{ opacity: 0, x: 0, scale: 0.5 }} // Starting state with zoom-out
            whileInView={{ opacity: 1, x: 0, scale: 1 }} // End state with zoom-in
            transition={{ duration: 2 }} // Transition duration
            viewport={{ once: true }} >
        <h2 className="text-blue-900 font-semibold text-xl underline">Personal Finance Chart</h2>
      </motion.div>}

      </div>

      {chartData.length>0 && <div className="flex flex-col gap-2 items-start ml-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block "
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-sm font-medium">{entry.name}</span>
          </div>
        ))}

       

      </div>}

      {chartData.length>0 && <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }} // Starting state with zoom-out
            whileInView={{ opacity: 1, y: 0, scale: 1 }} // End state with zoom-in
            transition={{ duration: 3 }} // Transition duration
            viewport={{ once: true }}
        
         className="w-px h-96 ml-6 bg-purple-600">
         </motion.div>}



    </div>
  );
};

export default OverallPieChart;
