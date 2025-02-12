import React,{useContext, useEffect, useState} from 'react'
import { addBucketList, fetchBucketListByUserAndYear, updateBucketList } from '../../bucketListApi';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import {useLocation} from 'react-router-dom'

const BucketList = ({isBucketModelOpen,setIsBucketModelOpen,currentYear}) => {

  const [newBudget,setNewBudget] = useState({
    checked: false,
    name: '',
    year: '',
    username:''
  });

  const location = useLocation(); 

  const {userData} = useContext(AppContext)

  const [addBudgetData,setAddBudgetData]= useState('')

  const [data, setData] = useState([]);

  const handleChange = async(index,id_bucket)=>{
    const updateData = [...data];

    updateData[index].checked = !updateData[index].checked;

    console.log(updateData[index])

    setNewBudget(updateData[index]);

  }

  useEffect(()=>{

    const updateBudget = async()=>{

    const response = await updateBucketList(newBudget.id_bucket,newBudget);

    console.log(response)
        if(response)
        {
          //toast.success("BucketList Updated Successfully");
          setNewBudget({checked: false,
                  name: '',
                  year: '',
                  username:''})
        }
  }
  updateBudget();

},[newBudget])


  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(addBudgetData.name==='')
    {
      return;
    }

    const username = userData.email;

    const updatedData = {
      ...newBudget,
      year:currentYear,
      name:addBudgetData,
      username:username
    }

    console.log(updatedData);

    const response = await addBucketList(updatedData);

    if(response)
    {
      toast.success("BucketList Added Successfully");
      setAddBudgetData('');
    }
  }

  useEffect(()=>{

    const loadData = async()=>{

      const username = userData.email;

      if(currentYear!==undefined && username !==undefined)
      {
        const responseData = await fetchBucketListByUserAndYear(username,currentYear);
        setData(responseData);
      }
    
    }

    loadData();

  },[addBudgetData,currentYear,location.pathname])


  return (
    <>
        <div className="modal" role="dialog" open={isBucketModelOpen}>
          <div className="modal-box w-72 bg-slate-100">
            <div className='flex justify-between'>
                <h3 className="text-xl font-bold text-orange-400">Bucket-List {currentYear}</h3>
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3"
                onClick={()=>setIsBucketModelOpen(false)}>
                  ✕
                </button>
            </div>

            <form className="flex flex-row mt-3" onSubmit={(e)=>handleSubmit(e)}>
      <label className="input input-bordered flex items-center w-40 mr-3 mb-3">
        <input type="text" className="grow" placeholder="Add Bucket List" value={addBudgetData} onChange={(e)=>setAddBudgetData(e.target.value)}/> </label>
        <button type="submit" className="btn btn-accent w-12 border rounded-2xl px-5 py-1">Add</button>
      
      </form>

            {data.length>0 && <div className='flex justify-between'>
              <span className='font-bold ml-4'>Target</span>
              <span className='font-bold'>Achieved</span>
            </div>}

          {data.map((d,index)=>( 
            <div key={index} className="form-control mt-2">
              <label className="cursor-pointer label">
                {d.checked ? <span className="label-text line-through text-md font-semibold">{`${index+1}) ${d.name}`}</span> :
                        <span className="label-text  text-md">{`${index+1}) ${d.name}`}</span>
                }
                <input type="checkbox" checked={d.checked} 
                onChange={()=>handleChange(index,d.id_bucket)} className="checkbox checkbox-warning" />
              </label>
          </div>))} 
          </div>
        </div>
    </>
  )
}

export default BucketList