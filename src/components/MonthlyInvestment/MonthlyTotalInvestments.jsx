import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import CurrencyDisplay from '../../utils/CurrencyDisplay';

const MonthlyTotalInvestments = ({title,investData}) => {

    const [totalInvestments,setTotalInvestments] = useState('');


    useEffect(()=>{

        const TotalInvestments = investData.reduce((sum,invest)=> sum + Number(invest.amount),0);

        setTotalInvestments(TotalInvestments);

    },[investData])


  return (
    <motion.div 
        
    initial={{opacity:0,y:-100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}} 
    
    className={`stats shadow ${investData.length>0 ? "flex mt-3" : "absolute right-10 top-48"} bg-rose-200 w-80`}>
    <div className="stat">
        <div className="stat-title text-gray-800">Total Investments in {title}</div>
           <div className="stat-value mt-2 text-purple-700"><CurrencyDisplay amount={totalInvestments}/></div>       
    </div>
     </motion.div>
  )
}

export default MonthlyTotalInvestments