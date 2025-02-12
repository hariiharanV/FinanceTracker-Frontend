import React,{useContext, useState} from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate();

    const {backendURL,setIsLoggedIn, getUserData} = useContext(AppContext);

    const [state,setState] = useState('Sign Up')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async(e)=>{

        try{
            
            e.preventDefault();
        
          axios.defaults.withCredentials = true;  

            if(state === "Sign Up")
            {
               const {data} =  await axios.post(backendURL+'/api/auth/register',{
                    name,email,password})

                    if(data.success)
                    {
                        setIsLoggedIn(true);
                        getUserData();
                        navigate('/')
                    }else{
                        toast.error(data.message);
                    }
            }else{

                const {data} =  await axios.post(backendURL+'/api/auth/login',
                    {email,password})

                    if(data.success)
                    {
                        setIsLoggedIn(true);
                        getUserData();
                        navigate('/')
                    }else{
                        toast.error(data.message);
                    }

            }

        }catch(error)
        {
            toast.error(error.message)
        }    
    }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br
    from-blue-200 to-purple-400 '>
        
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
        text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-2'>{state === "Sign Up" ? "Create Account": "Login"}</h2>
            <p className='text-center text-sm mb-6'>{state === "Sign Up" ? "Create Your Account": "Login to your Account"}</p>

            <form onSubmit={(e)=>onSubmitHandler(e)}>
               {state === "Sign Up" && <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full 
                bg-[#333A5C]'>
                    <img src={assets.person_icon}/>
                    <input className="outline-none bg-transparent" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Full Name' required/>
                </div>
               }
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full 
                bg-[#333A5C]'>
                    <img src={assets.mail_icon}/>
                    <input className="outline-none bg-transparent" value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email' required/>
                </div>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full 
                bg-[#333A5C]'>
                    <img src={assets.lock_icon}/>
                    <input className="outline-none bg-transparent" value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password' required/>
                </div>

                <p onClick={()=>navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>

                <button className='w-full rounded-full py-2.5 bg-gradient-to-r 
                from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
            </form>

          {state === "Sign Up"? <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
          <span onClick={()=>setState("Login")} className='text-blue-400 cursor-pointer underline'>Login here</span></p>   
               :
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
            <span onClick={()=>setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign Up</span></p>
          }

        </div>

        
    </div>
  )
}

export default Login