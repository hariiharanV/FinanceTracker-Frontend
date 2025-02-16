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
    <div className='flex flex-col mx-auto px-4 md:px-8'>

      <div>
         {investmentTypes.length===0 && <DisplayCollapseInvestment /> }   
      </div>   

      <div className="flex flex-col md:flex-row border rounded-xl mt-3 mb-3 mx-auto bg-yellow-100 items-center p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-4">
       {/* Total Investment Amount Display */}

       <div className="md:w-auto">
       <CollapseForInvestTypes setInvestmentTypesModified={setInvestmentTypesModified}/>
       </div>

       {investData.length>0 && 
       (<div className="w-full md:w-auto">
       <MonthlyTotalInvestments title={title} investData={investData}/>
       </div>)}

       <div className="md:w-auto">
        <TotalInvestmentsNumber title={title} investData={investData}/>
        </div>

      </div>

       {investmentTypes.length>0 && 
        (<div className="w-full md:w-auto">
       <InvestmentTableData investData={investData} setIsModelOpen={setIsModelOpen} 
        setInvestmentModified={setInvestmentModified} setEditInvestData={setEditInvestData}
        setIsEditModelOpen={setIsEditModelOpen}/>
        </div>)}

         {/* Add Investment Modal */}
        <AddInvestment isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} title={title} 
        setInvestmentModified={setInvestmentModified} investmentTypes={investmentTypes} 
        currentYear={currentYear}/>

         {/* Edit Investment Modal */}
         <EditInvestment isEditModelOpen={isEditModelOpen} setIsEditModelOpen={setIsEditModelOpen} title={title} 
        setInvestmentModified={setInvestmentModified} editInvestData={editInvestData}
        investmentTypes={investmentTypes}/>

       
        {/* <div className='flex flex-col sm:w-1/2 items-center mr-4'>

           

        </div> */}

    </div>
  )
}

export default MonthlyInvestment