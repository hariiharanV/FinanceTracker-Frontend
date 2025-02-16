import React, { useContext, useEffect , useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppContext } from "../../context/AppContext";
import { fetchExpensesByUserAndYear } from "../../api";
import { motion } from "framer-motion";

const ExpenseByPersonPieChart = ({year}) => {
  const [chartData, setChartData] = useState([]);
  const [settledByIndividual,setSettledByIndividual] = useState([])

  const {userData} = useContext(AppContext);


  useEffect(() => {
    
    const loadExpenses = async()=>{

      const username = userData.email;

      const expense_response = await fetchExpensesByUserAndYear(username,year);

          const uniqueSettledBy = [...new Set(expense_response.map(exp => exp.settledBy))];

          const settledBySums = uniqueSettledBy.map(name => {
            const value = expense_response
              .filter(exp => exp.settledBy.toLowerCase() === name.toLowerCase())
              .reduce((sum, exp) => sum + Number(exp.finalAmountSettled), 0);
              return { name, value };
              });
             // setSettledByIndividual(settledBySums)

             if(settledBySums.length >0)
             {
                  setTimeout(() => {
                    setChartData(settledBySums);
                }, 200);
              }else{
                setChartData([])
              }
      
       }

    loadExpenses();

  }, [userData,year]);


  // useEffect(()=>{
    
  //   if(settledByIndividual.length >0)
  //       {
  //         setTimeout(() => {
  //         setChartData(settledByIndividual);
  //     }, 200); // Small delay to trigger animation
  // }

  // },[settledByIndividual])

  const COLORS = ["#bd40e3","#cc6441","#e88787","#f7c743","#5495d6","#87e5e8","#66e38c"];

  return (
    <div className="flex items-center">
     <div className="flex flex-col items-center">
        <PieChart width={400} height={400}>
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
        <h2 className="text-rose-600 font-semibold text-xl underline">Individual Expense Chart</h2>
      </motion.div>}   

      </div>
     

      <div className="flex flex-col items-start ml-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block "
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-sm font-medium">{entry.name}</span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ExpenseByPersonPieChart;
