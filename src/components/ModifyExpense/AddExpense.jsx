import React, { useContext, useEffect, useState } from 'react'
import  {toast}  from 'react-toastify';
import { createExpense } from '../../api.js';
import { AppContext } from '../../context/AppContext.jsx';
import FormatDateToDDMMYYYY from '../../utils/FormatDateToDDMMYYYY.jsx';

const AddExpense = ({title, setIsModelOpen,isModelOpen, currentYear, setExpenseModified}) => {

  const {userData} = useContext(AppContext);

    const [formData,setFormData] = useState({
      expenditureType: "",
      plannedExpense: "",
      expenseDate:"",
      givenBy: "",
      settledBy: "",
      finalAmountSettled: "",
      month: "",
      year:"",
      username:"",
      note:""
    })
    const [error,setError] = useState('');


    useEffect(()=>{

        setError('');

      },[isModelOpen])

    const handleChange = (e)=>{
       const {name,value} = e.target;
       const monthVal = title;

       setFormData((prev)=>({
         ...prev, //month:monthVal, year:currentYear, username:userData.email, 
        [name]:value,
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
                    expenseDate:FormatDateToDDMMYYYY(formData.expenseDate),
                    month:title,
                    username:userData.email,
                    year:currentYear
                }

                try {
                  const response = await createExpense(updatedFormData);
            
                  if (response.status === 201) {
                    toast("New Expense Added Successfully");
                    setFormData({
                      expenditureType: "",
                      plannedExpense: "",
                      expenseDate:"",
                      givenBy: "",
                      settledBy: "",
                      finalAmountSettled: "",
                      month: "",
                      year:"",
                      username:"",
                      note:""
                    });
                  }
                } catch (error) {
                  toast.error("Failed to add Expense. Please try again.");
                  console.error(error);
                }        

        setIsModelOpen(false);
        setExpenseModified(true);
        // toast("New Expense Added Successfully");
    }

  return (
    <div>
         <dialog className="modal" open={isModelOpen} >
          <div className="modal-box scrollbar-hide">
          <h3 className="font-bold text-xl absolute left-5 top-3 text-yellow-400 ">New Expense</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>setIsModelOpen(false)}>
              ✕
            </button>
            

            {/* Adding Forms here */}
    <form method="dialog" className='flex flex-col gap-2 mt-5 justify-center' onSubmit={(e)=>handleFormSubmit(e)}>
           <div className='flex flex-col gap-2 my-3 '>
                <label className="input input-bordered flex  md:text-lg items-center gap-2">
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
                    <button type="submit" className="btn btn-outline py-1 btn-warning">Add Expense</button>
                </div>
            </div> 
        </form>
          </div>
        </dialog>
    </div>
  )
}

export default AddExpense