import React from 'react'
import { motion } from 'framer-motion'

const DisplayCollapseInvestment = ({title,}) => {
  return (

        <motion.div

        initial={{opacity:0,x:-100}}
        transition={{duration:1}}
        whileInView={{opacity:1,x:0}}
        viewport={{once:true}}

tabIndex={0}
className="bg-primary ml-3 w-3/4 mt-3 h-auto text-primary-content focus:bg-secondary focus:text-secondary-content collapse">
 <div className="collapse-title text-gray-200 ">

"Touch me to see the Magic"

</div>
<div className="collapse-content">
<p className='text-blue-800'>
Choose your investment type wisely—because planting the wrong seeds
 won't grow the right tree <span className='text-black'>(unless you're a wizard)!</span>
</p>
</div>
</motion.div>

  )
}

export default DisplayCollapseInvestment