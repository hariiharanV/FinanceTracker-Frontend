import React, { useContext, useEffect, useState } from 'react'
import MonthlyExpense from '../../components/MonthlyExpense/MonthlyExpense.jsx'
import AddExpense from '../../components/ModifyExpense/AddExpense.jsx'
import { fetchExpensesByMonth, fetchExpenses, fetchExpensesByMonthYearAndUser } from '../../api.js'
import { fetchIncomeByMonthYearAndUser } from '../../incomeApi.js'
import EditExpense from '../../components/ModifyExpense/EditExpense.jsx'
import { AppContext } from '../../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'


const Expense = ({title,expenseModified,setExpenseModified,isModelOpen,setIsModelOpen,expensesList,setExpensesList,
  filteredExpenses,currentYear, monthlyIncome,setMonthlyIncome}) => {

 const [monthlyIncomeAdded,setMonthlyIncomeAdded] = useState(false);
 const [isEditModelOpen, setIsEditModelOpen] = useState(false);
 const [editExpenseData,setEditExpenseData] = useState({});

 const {userData} = useContext(AppContext);

 const navigate = useNavigate();


useEffect(()=>{

  const loadExpenses = async()=>{

   // const data = await fetchExpensesByMonthAndYear(title,currentYear)

      const username = userData.email;

      console.log("username is =>"+username)

   const data = await fetchExpensesByMonthYearAndUser(title,currentYear,username)

    setExpensesList(data);
  }

   loadExpenses();

   setExpenseModified(false)

},[expenseModified,currentYear,userData])


useEffect(()=>{

setExpensesList(filteredExpenses);

},[filteredExpenses])


useEffect(()=>{

  const loadIncome = async()=>{
   // const data = await fetchIncomeByMonthAndYear(title,currentYear);

   const username = userData.email;

   const data = await fetchIncomeByMonthYearAndUser(title,currentYear,username);

    setMonthlyIncome(data.monthlyIncome);
}

loadIncome();

},[monthlyIncomeAdded,currentYear,userData])


  return (
    <>

        <MonthlyExpense expensesList={expensesList} title={title} setExpenseModified={setExpenseModified}
          setMonthlyIncomeAdded={setMonthlyIncomeAdded} setMonthlyIncome={setMonthlyIncome}
          monthlyIncomeAdded={monthlyIncomeAdded} monthlyIncome={monthlyIncome} currentYear={currentYear}
          setIsEditModelOpen={setIsEditModelOpen} setEditExpenseData={setEditExpenseData}
        />


        <AddExpense title={title} setIsModelOpen={setIsModelOpen} setExpensesList={setExpensesList}
        isModelOpen={isModelOpen} expensesList={expensesList} setExpenseModified={setExpenseModified} 
          monthlyIncome={monthlyIncome} currentYear={currentYear}
        />

        <EditExpense isEditModelOpen={isEditModelOpen} setExpenseModified={setExpenseModified}
         editExpenseData={editExpenseData} setIsEditModelOpen={setIsEditModelOpen} expensesList={expensesList}/>


    </>
  )
}

export default Expense