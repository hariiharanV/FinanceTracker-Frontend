import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL +'/expense'

const fetchExpenses = async () => {
    try {
      const response = await axios.get(BASE_URL+'/'); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error; 
    }
  };


  const createExpense = async (expenseData) => {
    try {

      const response = await axios.post(BASE_URL+'/',expenseData); 
      return response.data; 
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error; 
    }
  };  


  const deleteExpense = async(id) =>{

    try
    {
      const response = await axios.delete(BASE_URL+`/${id}`);

     return "Expense Deleted Successfully";

    }catch(err)
    {
      throw err;
    }
}

const fetchExpenseById = async(id)=>{
  try
  {
    const response = await axios.get(BASE_URL+`/id/${id}`);

   return response.data;

  }catch(err)
  {
    throw err;
  }
}


const fetchExpensesByMonth = async(month)=>{
  try
  {
    const response = await axios.get(BASE_URL+`/month/${month}`);

   return response.data;

  }catch(err)
  {
    throw err;
  }
}

const fetchExpensesByMonthAndYear = async(month,year)=>{
  try
  {
    const response = await axios.get(BASE_URL+`/year/${year}/month/${month}`);

   return response.data;

  }catch(err)
  {
    throw err;
  }
}

const fetchExpensesByMonthYearAndUser = async(month,year,username)=>{
  try
  {
    const response = await axios.get(BASE_URL+`/username/${username}/year/${year}/month/${month}`);

    console.log('response is =>'+ response.data)

   return response.data;

  }catch(err)
  {
    throw err;
  }
}

const fetchExpensesByUserAndYear = async(username,year)=>{
  try{

  const response = await axios.get(BASE_URL+`/username/${username}/year/${year}`);

   return response.data;

  }catch(err)
  {
    throw err;
  }

}

const updateExpense = async(id, updateData) =>{

  try
  {
    const response = await axios.put(BASE_URL+`/${id}`,updateData);

   return "Expense Updated Successfully";

  }catch(err)
  {
    throw err;
  }

}


export {fetchExpenses, createExpense, deleteExpense, updateExpense, fetchExpensesByMonthAndYear,
  fetchExpenseById, fetchExpensesByMonth,fetchExpensesByMonthYearAndUser,fetchExpensesByUserAndYear}