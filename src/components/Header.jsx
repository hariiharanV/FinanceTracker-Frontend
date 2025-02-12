import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const Header = () => {

  const {userData} = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <>
    <div className='flex flex-row justify-normal align-center items-center'>
    <div className='flex flex-col items-center px-4 text-gray-800 text-center'>
        {/* <img src={assets.header_img} className='w-32'/> */}
        <motion.img 
        initial={{opacity:0,y:-200}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        
        src="home_image2.jpg"className=' w-3/4'/>

        {userData && <h1 
      
        className='text-xl sm:text-3xl font-medium mb-2'>`Hey, {userData.name}` </h1> }
        {!userData && <h2 className='text-xl sm:text-3xl font-medium mb-2'> Welcome to Personal 
       
       <motion.span 

        initial={{opacity:0,x:0}}
        transition={{duration:1}}
        whileInView={{opacity:2,x:0}}
        viewport={{once:true}}>
        <span className='text-green-700'> Finance-</span><span className='text-rose-500'>Tracker</span>
        
        </motion.span>

        </h2>}
        <button onClick={()=>navigate('/financeTracker')} className='border rounded-full text-gray-800 px-8 py-2
        hover:bg-green-100 cursor-pointer font-semibold'>{userData? "Get Started" : "Login"}</button>
    </div>
    </div>
    </>
  )
}

export default Header