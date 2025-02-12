import { useContext, useEffect, useState , useRef} from "react"
import PersonalFinanceChart from "./PersonalFinanceChart"
import { toast } from "react-toastify";
import { fetchIncomeByMonthYearAndUser } from "../../incomeApi";
import { AppContext } from "../../context/AppContext";
import ExpenseByPersonMonthlyChart from "./ExpenseByPersonMonthlyChart";


const MonthlyPieChart = ({showMonthlyPieChart,currentYear,setShowMonthlyPieChart,title}) => {


  return (

    <div className="flex items-center">
      <div className="modal" role="dialog" open={showMonthlyPieChart}>

      <div className="modal-box w-full max-w-5xl bg-slate-100">

      <div className='flex justify-between'>
                {/* <h3 className="text-xl font-bold text-orange-400">{title} Chart </h3> */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3"
                onClick={()=>setShowMonthlyPieChart(false)}>
                  ✕
                </button>
            </div> 

       <div className="flex items-center">
             <div className="flex flex-row items-center">
        <PersonalFinanceChart showMonthlyPieChart={showMonthlyPieChart} currentYear={currentYear}
            setShowMonthlyPieChart={setShowMonthlyPieChart} title={title} />
            

            <ExpenseByPersonMonthlyChart showMonthlyPieChart={showMonthlyPieChart} currentYear={currentYear}
            setShowMonthlyPieChart={setShowMonthlyPieChart} title={title} />
            </div>
            </div>
        </div>
        <h3 className="text-xl font-bold text-orange-400">{title} Chart </h3>
        </div>

       

        </div>

    
  )
}

export default MonthlyPieChart