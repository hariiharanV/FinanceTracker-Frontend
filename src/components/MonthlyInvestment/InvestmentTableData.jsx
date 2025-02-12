import React,{useState} from 'react'
import { motion } from 'framer-motion'
import FormatDateToDDMMYYYY from '../../utils/FormatDateToDDMMYYYY'
import { deleteInvestmentById, fetchInvestmentById } from '../../investApi';
import { toast } from 'react-toastify';

const InvestmentTableData = ({investData, setIsModelOpen,setEditInvestData, setInvestmentModified, setIsEditModelOpen}) => {

const handleEdit = async(id)=>{

    console.log('Calling handleEdit')

    setIsEditModelOpen(true);

    const response = await fetchInvestmentById(id);
    if(response)
    {
        setEditInvestData(response);
    }
}

const handleDelete = async(id)=>{

       const response = await deleteInvestmentById(id);

       if(response.status===200)
       {
        toast.error('Investment Deleted Successfully')
       }

       setInvestmentModified(true);
}

  return (
    <motion.div
        initial={{opacity:0,x:-100}}
    transition={{duration:1}}
    whileInView={{opacity:1,x:0}}
    viewport={{once:true}}  
 >
    {/* Add Investment Modal */}
    {/* <AddInvestment isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}/> */}


     <table className="table w-20 sm:w-15">
     {/* head */}
     <thead>
         <tr className='text-sm'>
         <th></th>
         <th>Investment Type</th>
         <th>Investment Date</th>
         <th>Investment Category</th>
         <th>Amount</th>
         <th>Invested By</th>
         <th>
            <button className="btn btn-outline btn-secondary" onClick={()=>setIsModelOpen(true)}>New Investment</button>
         </th>
         </tr>
     </thead>
     <tbody>     
        {investData.map((invest,index)=>(
            <tr key={index}>
                <th></th>
                <td>{invest.investmentType}</td>
                <td>{FormatDateToDDMMYYYY(invest.investmentDate)}</td>
                <td>{invest.investmentCategory}</td>
                <td>{invest.amount}</td>
                <td>{invest.investedBy}</td>
                <td >
         <div className='flex flex-row justify-center '>
         <button onClick={()=>handleEdit(invest.id_invest)}>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-100" viewBox="0 0 512 512" width="24" height="24" fill="#73a3f8">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
            </svg></div>
         </button>

        <button onClick={()=>handleDelete(invest.id_invest)}>
            <div className='mt-0.5 ml-3'> <svg className="hover:scale-110 transition-transform duration-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="21" height="21" fill="#ff4c2c">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg></div>
        </button>        
         </div>
     </td>
            </tr>
        ))}
     </tbody>
     </table>
  </motion.div>
  )
}

export default InvestmentTableData