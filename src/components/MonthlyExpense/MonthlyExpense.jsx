import React, { useState } from 'react'
import DisplayCollapseMessage from './DisplayCollapseMessage';
import MonthlyIncome from './MonthlyIncome';
import ExpenditureData from './ExpenditureData';
import SavingsData from './SavingsData';
import ExpenseTableData from './ExpenseTableData';


const MonthlyExpense = ({expensesList,title,currentYear,setEditExpenseData,setIsEditModelOpen,setExpenseModified,setMonthlyIncomeAdded, monthlyIncomeAdded, setMonthlyIncome, monthlyIncome}) => {


const [monthlyIncomeDummy,setMonthlyIncomeDummy] = useState('');
const [monthlySavings,setMonthlySavings] = useState('');


const showSavings = ()=>{

   return expensesList.length > 0 && monthlyIncome ? true : false;
}

  return (

    <>
   
    <div className="flex flex-col justify-between mx-auto">



    {/* Collapse to display message */}
    <div>
        {expensesList.length==0 && <DisplayCollapseMessage expensesList={expensesList} title={title} monthlyIncome={monthlyIncome}/>}
    </div>



    <div className='flex flex-col border rounded-xl  mt-3 mb-3 mx-auto bg-orange-100 items-center ml-2 justify-between mr-3'>   

    <div className='flex flex-row  my-3 justify-center items-center'>

    {/* Showing the total Income data */} 
    <div className='mr-4'>
     <MonthlyIncome title={title} setMonthlyIncome={setMonthlyIncome}
     setMonthlyIncomeAdded={setMonthlyIncomeAdded} monthlyIncome={monthlyIncome} currentYear={currentYear}
      monthlyIncomeDummy={monthlyIncomeDummy} setMonthlyIncomeDummy={setMonthlyIncomeDummy}/>
    </div>    


    {/* Showing the total expenditure data */}
    <div>
     {expensesList.length>0 &&  <ExpenditureData setMonthlySavings={setMonthlySavings}
    expensesList={expensesList} monthlyIncome={monthlyIncome}/> }   
    </div>


     {/* Showing the total savings data */}
     <div>
     {showSavings() &&  <SavingsData title={title} expensesList={expensesList} monthlySavings={monthlySavings}/> }
     </div>
     
     </div>

    </div>    

    {/* Table Data */}
    {expensesList.length >0 && <ExpenseTableData expensesList={expensesList} setEditExpenseData={setEditExpenseData}
        setIsEditModelOpen={setIsEditModelOpen} setExpenseModified={setExpenseModified}
    /> } 



    {/* Showing the Right Panel */}        
    {/* <div className='flex flex-col mt-3 ml-2 items-center  mr-3'> */}
    


    {/* Showing the total Income data */}     
     {/* <MonthlyIncome title={title} setMonthlyIncome={setMonthlyIncome}
     setMonthlyIncomeAdded={setMonthlyIncomeAdded} monthlyIncome={monthlyIncome} currentYear={currentYear}
      monthlyIncomeDummy={monthlyIncomeDummy} setMonthlyIncomeDummy={setMonthlyIncomeDummy}/> */}



    {/* Showing the total expenditure data */}
    {/* {expensesList.length>0 &&  <ExpenditureData setMonthlySavings={setMonthlySavings}
    expensesList={expensesList} monthlyIncome={monthlyIncome}/> }    */}



     {/* Showing the total savings data */}
    {/* {showSavings() &&  <SavingsData title={title} expensesList={expensesList} monthlySavings={monthlySavings}/> }

    </div>    */}

  </div>
  </>
  )
}

export default MonthlyExpense