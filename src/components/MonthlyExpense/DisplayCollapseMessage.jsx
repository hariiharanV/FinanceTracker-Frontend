import React from 'react'
import { motion } from 'framer-motion'

const DisplayCollapseMessage = ({expensesList,title,monthlyIncome}) => {
  return (

         <motion.div

        initial={{opacity:0,x:-100}}
        transition={{duration:1}}
        whileInView={{opacity:1,x:0}}
        viewport={{once:true}}

tabIndex={0}
className="bg-primary ml-3 w-3/4 mt-3 h-auto text-primary-content focus:bg-secondary focus:text-secondary-content collapse">
<div className="collapse-title text-gray-200">

{!monthlyIncome ? "Touch me to see the Magic!" : <>Touch me to see the Magic <span className='text-orange-300'>Again!</span></>}

</div>
<div className="collapse-content">
<p className='text-blue-800'>
{!monthlyIncome ? (
<>
  Add your {title} income first—because you can't manage what doesn’t exist{" "}
  <span className='text-black'>(unless you’re a magician)!</span>
</>
) : (
"Add your expenses now—because tracking invisible spending is a trick even magicians can’t pull off!"
)}
</p>
</div>
</motion.div>

  )
}

export default DisplayCollapseMessage