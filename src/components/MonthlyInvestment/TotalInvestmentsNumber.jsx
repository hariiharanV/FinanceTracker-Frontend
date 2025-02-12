import React from 'react'
import { motion } from 'framer-motion'

const TotalInvestmentsNumber = ({title,investData}) => {
    return (
        <>
        {investData.length>0 && <motion.div 
            
        initial={{opacity:0,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}} 
        
        className={`stats shadow ${investData.length>0 ? "flex mt-3" : "absolute right-10 top-48"} bg-slate-300 w-64`}>
        <div className="stat">
            <div className="stat-title text-blue-900 text-sm flex justify-center">Number of Investments in {title}</div>
               <div className="stat-value flex justify-center text-blue-900">{investData.length}</div>       
        </div>
         </motion.div>}
         </>
      )
}


export default TotalInvestmentsNumber