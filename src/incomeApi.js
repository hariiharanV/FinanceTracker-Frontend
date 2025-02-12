import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL+'/income'

const fetchIncome = async (month) => {
    try {
      const response = await axios.get(BASE_URL+`/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
  };

  const fetchIncomeByMonthAndYear = async (month,year) => {
    try {
      const response = await axios.get(BASE_URL+`/year/${year}/month/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
  };

  const fetchIncomeByUserAndYear = async (username,year) => {
    try {
      const response = await axios.get(BASE_URL+`/username/${username}/year/${year}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
  };

  const fetchIncomeByMonthYearAndUser = async (month,year,username) => {
    try {
      const response = await axios.get(BASE_URL+`/username/${username}/year/${year}/month/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
  };

  const addIncome = async (incomeData) => {
    try {

      console.log(incomeData)

      const response = await axios.post(BASE_URL,incomeData); 
      return response.data; 
    } catch (error) {
      console.error('Error creating income:', error);
      throw error; 
    }
  };  

  const updateIncome = async(month,incomeData)=>{

    try{
      const response = await axios.put(BASE_URL+`/${month}`,incomeData);

      return response.data;
    }catch(error){
      throw error;
    }
  }



  export {fetchIncome, addIncome, updateIncome, fetchIncomeByUserAndYear,fetchIncomeByMonthYearAndUser,fetchIncomeByMonthAndYear}
