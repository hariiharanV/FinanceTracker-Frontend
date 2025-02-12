import React,{useState,useEffect, useContext} from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { fetchExpensesByMonthYearAndUser } from '../../api';
import { fetchInvestmentsByMonthYearAndUser } from '../../investApi';
import { fetchIncomeByMonthYearAndUser } from '../../incomeApi';
import { AppContext } from '../../context/AppContext';
import { motion } from "framer-motion";

const PersonalFinanceChart = ({showMonthlyPieChart,currentYear,setShowMonthlyPieChart,title}) => {

    const [chartData, setChartData] = useState([]);

    const {userData} = useContext(AppContext)

    const loadExpenses = async()=>{

       const username = userData.email;
   
       const year = currentYear;
   
       const expense_response = await fetchExpensesByMonthYearAndUser(title,year,username);
   
      const total_expenses = expense_response.reduce((sum,expense)=>sum + Number(expense.finalAmountSettled),0);
   
      console.log('Total Expenses is =>'+ total_expenses);
   
      const invest_response = await fetchInvestmentsByMonthYearAndUser(title,year,username);
   
      const total_investments = invest_response.reduce((sum,invest)=>sum + Number(invest.amount),0);

      console.log('Total Investments is =>'+ total_investments);
   
       const total_income = await fetchIncomeByMonthYearAndUser(title,year,username);

       console.log('total income is =>'+ total_income)
   
   //   //  const total_income = income_response.reduce((sum,income)=>sum + Number(income.monthlyIncome),0);
   
        const total_savings = total_income.monthlyIncome - total_expenses - total_investments;

   //     console.log('Total Savings is =>'+ total_savings);
   
   //     if(total_investments==0 && total_savings ===0 && total_expenses===0)
   //       {
   //         console.log('inside empty')
   //         setChartData([]); 
   //       }
   
         const newData = [];
         if (total_expenses > 0) newData.push({ name: "Expenses", value: total_expenses });
          if (total_savings > 0) newData.push({ name: "Savings", value: total_savings });
         if (total_investments > 0) newData.push({ name: "Investments", value: total_investments });
   
   
         setTimeout(() => {
           
           setChartData(newData);
           
         }, 200);

   
     }


      useEffect(() => {
     
         console.log('running effect bcz of year change'+currentYear)
       
         setTimeout(() => {  
         loadExpenses();
         },200);
     
       }, [showMonthlyPieChart]);


       const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]; // Custom colors


  return (
  

      <div className="flex items-center">
    <div className="flex flex-col items-center">
      <PieChart width={350} height={300}>
        <Pie 
          data={chartData} 
          cx="50%" 
          cy="50%" 
          outerRadius={100} 
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
        <h2 className="text-blue-900 font-semibold text-lg underline">Personal Finance Chart</h2>
      </motion.div>}

      </div>

      {chartData.length>0 && <div className="flex flex-col gap-2 ml-2 items-start">
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
        
         className="w-px h-72 ml-6 bg-purple-600">
         </motion.div>}

    </div>

  )
}

export default PersonalFinanceChart