import React, { useContext, useEffect , useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppContext } from "../../context/AppContext";
import { fetchExpensesByUserAndYear } from "../../api";
import { fetchInvestmentByUserAndYear } from "../../investApi";
import { fetchIncomeByUserAndYear } from "../../incomeApi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const OverallInvestmentChart = ({currentYear}) => {
  const [chartData, setChartData] = useState([]);
  const {userData} = useContext(AppContext);
 
  const {setIsChartEmpty} = useContext(AppContext);

   const loadExpenses = async()=>{

    const username = userData.email;

    const year = currentYear;

   const invest_response = await fetchInvestmentByUserAndYear(username,year);

   console.log('invest_response =>'+ invest_response)

  // const total_investments = invest_response.reduce((sum,invest)=>sum + Number(invest.amount),0);

  const totalInvestments = invest_response.reduce((sum, invest) => sum + Number(invest.amount), 0);

   const investmentBySums = invest_response.reduce((acc, invst) => {
    const name = invst.investmentType;
    const value = Number(invst.amount);
    const existing = acc.find((item) => item.name === name);
    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name, value });
    }
    return acc;
  }, []);

       console.log('investmentBySums =>'+ investmentBySums);

       const investmentWithPercentage = investmentBySums.map((item) => ({
        ...item,
        percentage: ((item.value / totalInvestments) * 100).toFixed(0), // 2 decimal places
      }));

       if(investmentBySums.length >0)
        {
             setTimeout(() => {
               setChartData(investmentWithPercentage);
           }, 200);
         }else{
           setChartData([])
         }
  }

  useEffect(() => {

    loadExpenses();

  }, [userData,currentYear]);


  useEffect(()=>{

    loadExpenses()
  },[])

  const COLORS = ["#f7c743","#5495d6","#87e5e8","#66e38c","#bd40e3","#cc6441","#e88787"];

  return (
    <div className="flex  items-center">
    <div className="flex flex-col items-center">
      <PieChart width={420} height={400}>
        <Pie 
          data={chartData} 
          cx="50%" 
          cy="50%" 
          outerRadius={120} 
          fill="#8884d8" 
          dataKey="value" 
          label={({ name, value, percentage }) => `${name} (${percentage}%)`}
          isAnimationActive={true} // ✅ Enables animation
          animationDuration={1000} // ✅ Animation duration (1s)
          animationEasing="ease-out" // ✅ Smooth animation
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>
        <Tooltip formatter={(value, name, props) => [`₹${value}`, name]} />
      </PieChart>

      {chartData.length>0 && <motion.div 
      initial={{ opacity: 0, x: 0, scale: 0.5 }} // Starting state with zoom-out
            whileInView={{ opacity: 1, x: 0, scale: 1 }} // End state with zoom-in
            transition={{ duration: 2 }} // Transition duration
            viewport={{ once: true }} >
        <h2 className="text-orange-400 font-semibold text-xl underline">Investment Category Chart</h2>
      </motion.div>}

      </div>

      
      

      {chartData.length>0 && <div className="flex flex-col gap-2 items-start ml-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block "
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-sm font-medium">{entry.name}: ₹{entry.value} ({entry.percentage}%)</span>
          </div>
        ))}

       
          </div>} 
    

      </div>

    
  );
};

export default OverallInvestmentChart;
