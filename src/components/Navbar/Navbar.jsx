import React, { useContext, useState, useEffect } from 'react'
import { fetchExpensesByMonthYearAndUser } from '../../api.js';
import { fetchInvestmentsByMonthYearAndUser } from '../../investApi.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

const Navbar = ({setIsModelOpen, setIsBucketModelOpen,currentYear, setSearchTerm,setCurrentYear,setFilteredInvestments, setFilteredExpenses,  monthlyIncome}) => {

  const browserEndpoint = `${window.location.origin}${window.location.pathname}`;

  const curntYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => curntYear + i);
  const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const storedMonth = sessionStorage.getItem("month");
    if (storedMonth) {
      setTitle(storedMonth);
    }
  }, [location.pathname]);

  const sendVerificationOtp = async()=>{
      try{

          axios.defaults.withCredentials = true;

          const {data} = await axios.post(backendURL + '/api/auth/send-verify-otp')

          if(data.success)
          {
              navigate('/email-verify')
              toast.success(data.message)
          }else{
              toast.error(data.message)
          }

      }catch(error)
      {
          toast.error(error.message)
      }
  }

  const logout = async()=>{
      try{

          axios.defaults.withCredentials = true;

          const {data} = await axios.post(backendURL +'/api/auth/logout')

          data.success && setIsLoggedIn(false)
          data.success && setUserData(false)

          navigate('/')  
          
      }catch(error)
      {
          toast.error(error.message)
      }

  }


  const handleSearch = async(e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const username = userData.email;

    if(browserEndpoint.toString().includes("monthlyExpense"))
    {
       const FetchedData = await fetchExpensesByMonthYearAndUser(title,currentYear,username);

        const filtered = FetchedData.filter((expense) => {
          // Check all fields of the expense object for matches
          return Object.values(expense).some((val) =>
            String(val).toLowerCase().includes(value)
          );
        });

        setFilteredExpenses(filtered);
    }
    else if(browserEndpoint.toString().includes("monthlyInvestment")){
      console.log("Inside monthly investment")

      const FetchedData = await fetchInvestmentsByMonthYearAndUser(title,currentYear,username);

      const filtered = FetchedData.filter((expense) => {
        // Check all fields of the expense object for matches
        return Object.values(expense).some((val) =>
          String(val).toLowerCase().includes(value)
        );
      });

      setFilteredInvestments(filtered);
    }
    else{

    }

  };


  const handleYearChange = (e)=>{

    const {name,value} = e.target;

    setCurrentYear(value);

  }

  const showSearchBar = ()=>{

    if(browserEndpoint.toString().includes("monthlyInvestment") || browserEndpoint.toString().includes("monthlyExpense"))
    {
      return true;
    }else{
      return false;
    }
  }

  const showExpenseTab = ()=>{

    if(browserEndpoint.toString().includes("monthlyExpense"))
    {
      return true;
    }else{
      return false;
    }
  }

  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl" href="/financeTracker">{browserEndpoint.toString().includes("monthlyExpense")?`${title}-Expenses`:
    browserEndpoint.toString().includes("monthlyInvestments")?`${title}-Investments`:"Finance-Tracker"}
    </a>

    <select
        //value={selectedYear}
        onChange={handleYearChange}
       className='mt-2 bg-gray-700 text-gray-200 border rounded-2xl p-1 hover:bg-slate-500 cursor-pointer'
      >
        {years.map((year) => (
          <option key={year} value={year}>
           <span className="badge">{year}</span>
          </option>
        ))}
      </select>
    
  </div>
  
  <div className="flex-none gap-2">
    <div className="form-control flex flex-row gap-3">


    {monthlyIncome && showExpenseTab() && <button className="btn btn-outline btn-info" onClick={()=>setIsModelOpen(true)}>Add Expense</button>}
     
     {showSearchBar() && <motion.input
     initial={{opacity:0,x:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,x:0}}
    viewport={{once:true}} 

      type="text" placeholder="Search" onChange={handleSearch} className="input input-bordered text-blue-900 w-30 md:w-60 hover:w-96 hover:border-blue-400 hover:text-blue-900 focus:outline-none transition-all duration-400" />}
    
         {/*BucketList */}
    <motion.button 
    initial={{opacity:0,x:0}}
    transition={{duration:3}}
    whileInView={{opacity:1,x:0}}
    viewport={{once:true}} 

    className="btn btn-outline btn-primary" onClick={()=>setIsBucketModelOpen(true)}>Bucket List

    </motion.button>   
    
    </div>
   {userData && <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 border border-purple-800  rounded-full align-center items-center">
             <h1 className='text-2xl'>  {userData.name[0].toUpperCase()}</h1>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {!userData.isAccountVerified &&   
                 <li onClick={()=>sendVerificationOtp()} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
                }
        <li onClick={()=>logout()} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Navbar