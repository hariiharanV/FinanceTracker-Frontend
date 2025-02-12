import React from 'react'
import CurrencyDisplay from '../../utils/CurrencyDisplay'
import { motion } from 'framer-motion'

const SavingsData = ({title,expensesList, monthlySavings}) => {
  return (

    <motion.div 
        
        initial={{opacity:0,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}} 
        
        className={`stats shadow ${expensesList.length>0 ? "flex  mt-3" : "absolute right-10 top-48"} bg-yellow-100 w-70`}>
        <div className="stat">
            <div className="stat-title text-gray-800">Total Savings in {title}</div>
               <div className="stat-value mt-2 text-green-700"><CurrencyDisplay amount={monthlySavings}/></div>       
        </div>
         </motion.div>
  )
}

export default SavingsData