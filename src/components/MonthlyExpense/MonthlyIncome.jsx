import React,{useContext, useState} from 'react'
import { motion } from 'framer-motion';
import CurrencyDisplay from '../../utils/CurrencyDisplay';
import { updateIncome, addIncome } from '../../incomeApi';
import {AppContext} from '../../context/AppContext'

const MonthlyIncome = ({title,currentYear,monthlyIncomeDummy,setMonthlyIncomeDummy,monthlyIncome,setMonthlyIncome, setMonthlyIncomeAdded}) => {

    const [editIncome,setEditIncome] = useState(false);
    const [error,setError] = useState('');

    const {userData} = useContext(AppContext)

    const showIncomeInput = ()=>{

        const response =  !monthlyIncome || editIncome ? true : false;
    
        return response;
    }

    const restrictAdding = ()=>{

        console.log('Inside restrict Adding')

        setError("Income cannot be set to zero");

    }

    const addNewIncomeHandler = async()=>{

        if(monthlyIncomeDummy==='0')
        {
            restrictAdding();
            return;
        }

        const incomeData = {
            month:title,
            year:currentYear,
            username:userData.email,
            monthlyIncome:parseInt(monthlyIncomeDummy)
        }
    
      const response = await addIncome(incomeData);
    
        setMonthlyIncome(response.monthlyIncome);

        setError('');

    }
    
    const incomeHandler = (e)=>{

        e.preventDefault();
    
      //  setMonthlyIncome(monthlyIncomeDummy);
    
      if(editIncome)
      {
    
        console.log('Inside editINcome')
        updateIncomeHandler();
    
        setEditIncome(false);
    
      }else{
    
        console.log('Inside addINcome')
        addNewIncomeHandler();
    
      }
    
        setMonthlyIncomeAdded(true);
    
        setMonthlyIncomeDummy('');
    
    }

    const updateIncomeHandler = async()=>{

        if(monthlyIncomeDummy==='0')
            {
                restrictAdding();
                return;
            }
    
        const updatedIncomeData ={
            monthlyIncome:monthlyIncomeDummy
        }
    
        const response = await updateIncome(title,updatedIncomeData);
    
        setMonthlyIncome(response.monthlyIncome);

        setError('');
    }




  return (

<motion.div 

initial={{opacity:0,y:-100}}
transition={{duration:1}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}

className={`stats shadow flex bg-green-100 w-70 `}>

   <div className="stat">

   <div className='flex flex-row'>
       <div className="stat-title text-gray-700 mr-2 text-md">Total Income in {title} </div>

       <button type="button" onClick={()=>setEditIncome(true)}>
       <div>
       <svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-100" viewBox="0 0 512 512" width="22" height="22" fill="#2bcf9b">
       <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
       </svg></div>
       </button>
   </div>
      
       {showIncomeInput() && <form className='flex flex-row text-xl justify-center mt-2' onSubmit={(e)=>incomeHandler(e)}>
           <input
               type="number"
               placeholder="Add Income here"
               className="input mr-1 appearance-none input-bordered input-success w-3/4" 
                   onChange={(e)=>setMonthlyIncomeDummy(e.target.value)}
               required />
          <button type="submit" className="btn btn-ghost">Confirm</button>
       </form>}

           {monthlyIncomeDummy && <div className="stat-value mt-2 text-blue-950"><CurrencyDisplay amount={monthlyIncomeDummy}/> </div> }
           {monthlyIncome && !editIncome && <div className="stat-value mt-2 text-blue-950"><CurrencyDisplay amount={monthlyIncome}/> </div> }

            {error && <p className='text-red-400 mt-1'>{error}</p>}     
       </div>
</motion.div>    

  )
}

export default MonthlyIncome