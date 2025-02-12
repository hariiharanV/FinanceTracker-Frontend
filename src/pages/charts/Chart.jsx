import React, { useContext, useEffect, useState } from 'react'
import OverallPieChart from '../../components/Reports/OverallPieChart'
import ExpenseByPersonPieChart from "../../components/Reports/ExpenseByPersonPieChart";
import NoChart from '../../components/Reports/NoChart';
import { AppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';


const Chart = ({currentYear}) => {

  const [showOverallPieChart,setShowOverallPieChart] = useState(true);
  const [showIndividualPieChart,setShowIndividualPieChart] = useState(true);
 

  useEffect(()=>{
    setTimeout(() => {
      setShowOverallPieChart(true);
    }, 200);

    setTimeout(() => {
      setShowIndividualPieChart(true);
    }, 200);
    
  },[])


  return (
    <>
 <div className="flex flex-row gap-4 items-center mb-4 mx-auto">
      
       {/* {showOverallPieChart && <OverallPieChart currentYear={currentYear} /> } */}

       <OverallPieChart currentYear={currentYear} />
      
      {/* {showIndividualPieChart &&  <ExpenseByPersonPieChart year={currentYear}/>} */}

      <ExpenseByPersonPieChart year={currentYear}/>

      </div>
   </>
  
)
}

export default Chart