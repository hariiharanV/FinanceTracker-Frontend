import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const navigate = useNavigate();

  const {backendURL} = useContext(AppContext);
  axios.defaults.withCredentials = true;


  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState(false);
  const [otp,setOtp] = useState(0)
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false)

   const inputRef = React.useRef([]) // getElementById
  
    const handleInput = (e,index)=>{
      if(e.target.value.length>0 && index < inputRef.current.length-1)
      {
          inputRef.current[index+1].focus();
      }
    }
  
    const handlekeyDown = (e,index)=>{
      if(e.key === 'Backspace' && e.target.value === '' && index >0)
      {
        inputRef.current[index-1].focus();
      }
    }
  
    const handlePaste = (e)=>{
  
       const paste = e.clipboardData.getData('text');
  
       const pasteArray = paste.split('');
  
       pasteArray.forEach((char,index)=>{
          if(inputRef.current[index])
          {
            inputRef.current[index].value = char;
          }
       })
    }


    const onSubmitEmail = async(e)=>{
        e.preventDefault();

        try{
          const {data} = await axios.post(backendURL+'/api/auth/send-reset-otp',{email});

          data.success ? toast.success(data.message) : toast.error(data.message);

          data.success && setIsEmailSent(true)

        }catch(err)
        {
            toast.error(err.message)
        }
    }


    const onSubmitOtp = async(e)=>{
      e.preventDefault();

      const otpArray = inputRef.current.map(e=>e.value);

      setOtp(otpArray.join(''));

      setIsOtpSubmitted(true)

    }

    const onSubmitNewPassword = async(e)=>{
      e.preventDefault();

      try{

        const {data} = await axios.post(backendURL+'/api/auth/reset-password',{email,otp,newPassword})

        console.log(data)

        data.success ? toast.success(data.message) : toast.error(data.message);

        data.success && navigate('/login')

      }catch(err)
      {
        toast.error(err.message)
      }
    }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br
    from-blue-200 to-purple-400 '>


    {/* Enter Email Id */}

    {!isEmailSent && <form onClick={(e)=>onSubmitEmail(e)} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-center text-2xl mb-4 text-semibold'>Reset Password</h1>
        <p className='text-center mb-4 text-indigo-600'>Enter your registered Email Id</p>
        <div className='flex items-center gap-3 mb-4 w-full px-5 rounded-full py-2.5 bg-[#333A5C]'>
          <img src={assets.mail_icon} className="w-3 h-3" alt=""></img>
          <input type="email" placeholder='Email Id'
            className='bg-transparent outline-none text-white'
              value={email} onChange={(e)=>setEmail(e.target.value)} required
            />
        </div>
        <button type="submit" className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900
        text-white rounded-full mt-3 cursor-pointer'>Submit</button>
    </form>}


    {/* Verify OTP */}
    {!isOtpSubmitted && isEmailSent &&
    <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
    <h1 className='text-white text-center text-2xl mb-4 text-semibold'>Reset Password OTP</h1>
    <p className='text-center mb-4 text-indigo-600'>Enter the 6-digit code sent to your Email Id</p>

    <div className='flex justify-between mb-8' onPaste={handlePaste}>
      {Array(6).fill(0).map((_,index)=>(
        <input type="text" maxLength='1' key={index} required
          className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
          ref={e=>inputRef.current[index]=e}
          onInput={(e)=>handleInput(e,index)}
          onKeyDown={(e)=>handlekeyDown(e,index)}
        />
      ))}

    </div>
    <button type="submit" className='w-full py-2.5 bg-gradient-to-r from-indigo-500
    to-indigo-900 rounded-full text-white cursor-pointer'>Verify Email</button>
    </form>
    }

     {/* Enter New Password */}
     {isOtpSubmitted && isEmailSent &&
     <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-center text-2xl mb-4 text-semibold'>New Password</h1>
        <p className='text-center mb-4 text-indigo-600'>Enter the new password below</p>
        <div className='flex items-center gap-3 mb-4 w-full px-5 rounded-full py-2.5 bg-[#333A5C]'>
          <img src={assets.lock_icon} className="w-3 h-3" alt=""></img>
          <input type="password" placeholder='New Password'
            className='bg-transparent outline-none text-white'
              value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required
            />
        </div>
        <button type="submit" className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900
        text-white rounded-full mt-3 cursor-pointer'>Submit</button>
    </form>
     }


    </div>
  )
}

export default ResetPassword