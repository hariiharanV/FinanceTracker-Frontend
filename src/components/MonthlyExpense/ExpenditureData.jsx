import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CurrencyDisplay from '../../utils/CurrencyDisplay';

const ExpenditureData = ({expensesList, monthlyIncome, setMonthlySavings}) => {

    const [expectedExpense,setExpectedExpense] = useState(0);
    const [actualExpense,setActualExpense] = useState(0);

    useEffect(()=>{

        setExpectedExpense(expensesList.reduce((sum,expense)=> sum + Number(expense.plannedExpense),0));
    
        const actualExpenseCalculated = expensesList.reduce((sum,expense)=>sum + Number(expense.finalAmountSettled),0);
    
        setActualExpense(actualExpenseCalculated);
    
        const savings = Number(monthlyIncome) - Number(actualExpenseCalculated);
        setMonthlySavings(savings);
    
    },[expensesList,monthlyIncome])


  return (

<motion.div 

initial={{opacity:0,x:100}}
transition={{duration:1}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}} 

className="stats text-primary-content h-40 mr-4 overflow-hidden">
       <div className={`stat w-42 ${expectedExpense > actualExpense ? "bg-red-200 " : expectedExpense === actualExpense ? "bg-slate-500" :"bg-gray-500"} `}>
           <div className={`stat-title ${expectedExpense > actualExpense ? "text-gray-700" : "text-red-300"} `}>Expected Expense</div>
           <div className={`stat-value text-3xl ${expectedExpense > actualExpense ? "text-black" : "text-gray-100"} `}><CurrencyDisplay amount={expectedExpense}/></div>
       </div>
       <div className={`stat w-42 ${expectedExpense < actualExpense ? "bg-red-200 " : expectedExpense === actualExpense ? "bg-slate-500" : "bg-gray-500"}`}>
           <div className={`stat-title ${expectedExpense < actualExpense ? "text-gray-700" : "text-red-300"}`}>Actual Expense</div>
           <div className={`stat-value text-3xl ${expectedExpense < actualExpense ? "text-black" : "text-gray-100"}`}><CurrencyDisplay amount={actualExpense}/></div>
       </div>
   </motion.div>  

  )
}

export default ExpenditureData