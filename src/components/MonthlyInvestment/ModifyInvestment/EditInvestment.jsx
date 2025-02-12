import React from 'react'
import { useState, useEffect } from 'react';
import FormatDateToDDMMYYYY from '../../../utils/FormatDateToDDMMYYYY';
import { updateInvestment } from '../../../investApi';
import { toast } from 'react-toastify';

const EditInvestment = ({isEditModelOpen,setIsEditModelOpen, setInvestmentModified, editInvestData, investmentTypes, title}) => {

    const [formData, setFormData] = useState({
        investmentType:'',
        investmentDate:'',
        investmentCategory:'',
        amount:'',
        investedBy:''
    });
    const [error,setError] = useState('');

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
      
        if (isNaN(date)) {
          throw new Error("Invalid date format");
        }
      
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
        const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
      
        return `${year}-${month}-${day}`;
      }

    const handleChange=(e)=>{
        const {name,value} = e.target;

        setFormData((prev)=>({
            ...prev, [name]:value
        }))
    }

    useEffect(()=>{
        console.log('EditInvestment useEffect')

        if(Object.keys(editInvestData).length > 0)
        {
            console.log(editInvestData)
            console.log("data exists")
            const editData = {
                ...editInvestData,
                "investmentDate":formatDate(editInvestData.investmentDate)
            }
            setFormData(editData)
        }

    },[editInvestData])


    const handleFormSubmit = async(e)=>{
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            investmentDate:FormatDateToDDMMYYYY(formData.investmentDate),
            month:title
        }

        if(updatedFormData.investmentType ==='' || updatedFormData.investmentDate === '' || updatedFormData.investmentCategory ==='' ||
            updatedFormData.investedBy ==='' || updatedFormData.amount === '')
        {
            setError("All Fields Are Mandatory");
            return;
        }

        console.log(updatedFormData)

        const id = formData.id_invest;

        const response = await updateInvestment(id,updatedFormData);

        if(response === 200)
        {
            toast.success("Investment Updated Successfully");
            setIsEditModelOpen(false);
            setError('');
        }

        setInvestmentModified(true);
    }


  return (
    <div>
         <dialog className="modal " open={isEditModelOpen} >
          <div className="modal-box overflow-hidden">
          <h3 className="font-bold text-xl absolute left-5 top-3 text-orange-300 ">Edit Investment</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>setIsEditModelOpen(false)}>
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
                    <button type="submit" className="btn btn-outline btn-warning">Update Investment</button>
                </div>
            </div> 
        </form>
          </div>
        </dialog>
    </div>
  )
}

export default EditInvestment