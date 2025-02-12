import React, { useEffect, useState } from 'react'
import InvestmentTableData from './InvestmentTableData'
import MonthlyTotalInvestments from './MonthlyTotalInvestments'
import CollapseForInvestTypes from './CollapseForInvestTypes';
import AddInvestment from './ModifyInvestment/AddInvestment';
import EditInvestment from './ModifyInvestment/EditInvestment';
import TotalInvestmentsNumber from './TotalInvestmentsNumber'
import DisplayCollapseInvestment from './DisplayCollapseInvestment';


const MonthlyInvestment = ({title,investData,setInvestmentModified, setInvestmentTypesModified, investmentTypes,currentYear}) => {

    const [isModelOpen,setIsModelOpen] = useState(false);
    const [isEditModelOpen,setIsEditModelOpen] = useState(false);
    const [editInvestData,setEditInvestData] = useState({});

  return (
    <div className='flex flex-row justify-between'>

      <div>
         {investmentTypes.length===0 && <DisplayCollapseInvestment /> }   
      </div>   

       {investmentTypes.length>0 && <InvestmentTableData investData={investData} setIsModelOpen={setIsModelOpen} 
        setInvestmentModified={setInvestmentModified} setEditInvestData={setEditInvestData}
        setIsEditModelOpen={setIsEditModelOpen}/>}

         {/* Add Investment Modal */}
        <AddInvestment isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} title={title} 
        setInvestmentModified={setInvestmentModified} investmentTypes={investmentTypes} 
        currentYear={currentYear}/>

         {/* Edit Investment Modal */}
         <EditInvestment isEditModelOpen={isEditModelOpen} setIsEditModelOpen={setIsEditModelOpen} title={title} 
        setInvestmentModified={setInvestmentModified} editInvestData={editInvestData}
        investmentTypes={investmentTypes}/>

        <div className='flex flex-col items-center mr-4'>

            {/* Total Investment Amount Display */}
            {investData.length>0 && <MonthlyTotalInvestments title={title} investData={investData}/>}

            <CollapseForInvestTypes setInvestmentTypesModified={setInvestmentTypesModified}/>

            <TotalInvestmentsNumber title={title} investData={investData}/>

        </div>

    </div>
  )
}

export default MonthlyInvestment