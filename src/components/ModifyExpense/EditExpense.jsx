import React, { useEffect, useState } from 'react'
import  {toast}  from 'react-toastify';
import { createExpense, updateExpense } from '../../api.js';
import FormatDateToDDMMYYYY from '../../utils/FormatDateToDDMMYYYY.jsx';

const EditExpense = ({title, editExpenseData, setIsEditModelOpen,isEditModelOpen, expensesList, setExpenseModified, monthlyIncome}) => {

    const [formData,setFormData] = useState([])
    const [error,setError] = useState('');

    // useEffect(()=>{

    //     setError('');
    //   },[isModelOpen])

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

    const handleChange = (e)=>{
       const {name,value} = e.target;
       const monthVal = title;

       setFormData((prev)=>({
     //   ...prev, month:monthVal, monthlyIncome:monthlyIncome, [name]:value
     ...prev,  [name]:value
       }))    
    }

    const handleFormSubmit = async(e)=>{

        e.preventDefault();

        console.log('inside handleFormSubmit')
        console.log(formData)

        if(!formData.expenditureType || !formData.expenseDate || !formData.plannedExpense || !formData.givenBy || !formData.settledBy || !formData.finalAmountSettled)
        {
            setError('All Fields Are Mandatory!')
            return;
        }

        const updatedFormData = {
            ...formData,
            expenseDate:FormatDateToDDMMYYYY(formData.expenseDate)
        }

        await updateExpense(updatedFormData.id,updatedFormData)

        setExpenseModified(true)

        setIsEditModelOpen(false);
        toast.success("Expense Updated Successfully");
    }


    useEffect(()=>{

        console.log('EditExpenseData =>'+editExpenseData)

        if(Object.keys(editExpenseData).length > 0)
          {
              console.log(editExpenseData)
              console.log("data exists")
              const editData = {
                  ...editExpenseData,
                  "expenseDate":formatDate(editExpenseData.expenseDate)
              }
              setFormData(editData)
          }

        // setFormData(editExpenseData)

    },[editExpenseData])


  return (
    <div>
         <dialog className="modal scrollbar-hidden" open={isEditModelOpen} >
          <div className="modal-box">
          <h3 className="font-bold text-xl absolute left-5 top-3 text-orange-300 ">Edit Expense</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>setIsEditModelOpen(false)}>
              ✕
            </button>
            

            {/* Adding Forms here */}
    <form method="dialog" className='flex flex-col gap-2 mt-5 justify-center' onSubmit={(e)=>handleFormSubmit(e)}>
           <div className='flex flex-col gap-2 my-3 '>
                <label className="input input-bordered flex   items-center gap-2">
                Expenditure Type
                <input type="text" name="expenditureType" value={formData.expenditureType} onChange={handleChange} className="grow text-blue-700" placeholder='Electricity Bill' />
                </label>
                <label className="input input-bordered flex items-center gap-2" >
                Planned Expense in ₹
                <input type="number" name="plannedExpense" value={formData.plannedExpense} onChange={handleChange} className="grow text-blue-700" placeholder='1500'/>
                </label>
                <label className="input input-bordered flex items-center gap-2" >
                Expense Date
                <input type="date" name="expenseDate" value={formData.expenseDate} onChange={handleChange} className="grow text-blue-700" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                To Be Given by
                <input type="text" name="givenBy" value={formData.givenBy} onChange={handleChange} className="grow text-blue-700" placeholder='X' />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                Settled By
                <input type="text" name="settledBy" value={formData.settledBy} onChange={handleChange} className="grow text-blue-700" placeholder='Y'/>
                </label>
                <label className="input input-bordered flex  items-center gap-2">
                Final Settled Amt ₹
                <input type="number" name="finalAmountSettled" value={formData.finalAmountSettled} onChange={handleChange} className="grow text-blue-700" placeholder='1500' />
                </label>
                <label className="input input-bordered flex  items-center gap-2">
                Note
                <input type="String" name="note" value={formData.note} onChange={handleChange} className="grow text-blue-700" placeholder='If Any' />
                </label>
                {error && <p className='flex justify-center text-red-500 text-md'>{error}</p>}
                <div className='flex justify-end mt-2'>
                    <button type="submit" className="btn btn-outline btn-warning">Update Expense</button>
                </div>
            </div> 
        </form>
          </div>
        </dialog>
    </div>
  )
}

export default EditExpense