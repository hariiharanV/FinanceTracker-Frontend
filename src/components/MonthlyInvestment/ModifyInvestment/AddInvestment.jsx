import React, { useContext } from 'react'
import { useState } from 'react';
import { addNewInvestment } from '../../../investApi';
import FormatDateToDDMMYYYY from '../../../utils/FormatDateToDDMMYYYY';
import { toast } from 'react-toastify';
import { AppContext } from '../../../context/AppContext';

const AddInvestment = ({isModelOpen,setIsModelOpen,title,setInvestmentModified,currentYear, investmentTypes}) => {

    const [error,setError] = useState('');
    const [formData,setFormData] = useState({
        investmentType:'',
        investmentDate:'',
        investmentCategory:'',
        amount:'',
        investedBy:'',
        month:'',
        year:'',
        username:''
    })

    const {userData} = useContext(AppContext);

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormData((prev)=>({
            ...prev, [name]: value
        }))

        console.log(formData)
    }

    const handleFormSubmit = async(e)=>{

        e.preventDefault();

        if(formData.investmentType==='' || formData.investmentDate ==='' || formData.investmentCategory ===''
            || formData.investedBy ==='' || formData.amount ==='')
        {
            setError("All Fields Are Mandatory!")
            return;
        }

        const updatedFormData = {
            ...formData,
            investmentDate:FormatDateToDDMMYYYY(formData.investmentDate),
            month:title,
            username:userData.email,
            year:currentYear
        }

        try {
            const response = await addNewInvestment(updatedFormData);
      
            if (response.status === 201) {
              toast("New Investment Created Successfully");
              setFormData({
                investmentType:'',
                investmentDate:'',
                investmentCategory:'',
                amount:'',
                investedBy:'',
                month:'',
                year:'',
                username:''
              })
            }
          } catch (error) {
            toast.error("Failed to add investment. Please try again.");
            console.error(error);
          }

          setIsModelOpen(false); // Close the modal after successful submission
          setError('');
          setInvestmentModified(true);
    }

  return (
    <div>
         <dialog className="modal " open={isModelOpen} >
          <div className="modal-box overflow-hidden">
          <h3 className="font-bold text-xl absolute left-5 top-3 text-yellow-400 ">New Investment</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>setIsModelOpen(false)}>
              ✕
            </button>
            

            {/* Adding Forms here */}
        <form method="dialog" className='flex flex-col gap-2 mt-5 justify-center' onSubmit={(e)=>handleFormSubmit(e)}>
           <div className='flex flex-col gap-2 my-3 '>
                {/* <label className="input input-bordered flex  items-center gap-2">
                Investment Type
                <input type="text" name="investmentType" value={formData.investmentType} onChange={handleChange} className="grow text-blue-700" placeholder='Gold' />
                </label> */}

                <select name="investmentType" value={formData.investmentType} onChange={handleChange} className="select select-bordered w-full appearance-none cursor-pointer text-blue-700 max-w-xs">
                    <option disabled selected value='' className='text-black '>Pick your Investment Type</option>
                {investmentTypes.map((investType,index) => ( 
                    <option key={index} value={investType.category} className='text-black' >{investType.category}</option>
                ))}
                </select>

                <label className="input input-bordered flex items-center gap-2" >
                Investment Date
                <input type="date" name="investmentDate" value={formData.investmentDate} onChange={handleChange} className="grow text-blue-700" placeholder='1500'/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Investment Category
                <input type="text" name="investmentCategory" value={formData.investmentCategory} onChange={handleChange} className="grow text-blue-700" placeholder='Gold Coins' />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Amount in ₹
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="grow text-blue-700" placeholder='10000'/>
                </label>
                <label className="input input-bordered flex  items-center gap-2">
                Invested By
                <input type="text" name="investedBy" value={formData.investedBy} onChange={handleChange} className="grow text-blue-700" placeholder='X' />
                </label>
                {error && <p className='flex justify-center text-red-500 text-md'>{error}</p>}
                <div className='flex justify-end mt-2'>
                    <button type="submit" className="btn btn-outline btn-warning">Add Investment</button>
                </div>
            </div> 
        </form>
          </div>
        </dialog>
    </div>
  )
}

export default AddInvestment