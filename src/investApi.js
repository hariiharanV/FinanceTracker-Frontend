import axios from 'axios'

const BASE_URL = 'http://localhost:5000/investment'


const fetchAllInvestments = async () => {
    try {
      const response = await axios.get(BASE_URL); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
};

const fetchInvestmentsByMonth = async(month) => {
    try {
      const response = await axios.get(BASE_URL+`/month/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
};

const fetchInvestmentsByMonthAndYear = async(month,year) => {
    try {
      const response = await axios.get(BASE_URL+`/year/${year}/month/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
};

const fetchInvestmentsByMonthYearAndUser = async(month,year,username) => {
    try {
      const response = await axios.get(BASE_URL+`/username/${username}/year/${year}/month/${month}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
};

const fetchInvestmentById = async(id) => {
    try {
      const response = await axios.get(BASE_URL+`/id/${id}`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error; 
    }
};

const fetchAllInvestmentCategories = async()=>{
    try{
        const response = await axios.get(BASE_URL+'/category');

        return response.data;
    }catch(error){
        throw error;
    }
}

const fetchAllInvestmentCategoriesByUser = async(username)=>{
    try{
        const response = await axios.get(BASE_URL+`/category/username/${username}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

const fetchInvestmentByUserAndYear = async(username,year)=>{
    try{
        const response = await axios.get(BASE_URL+`/username/${username}/year/${year}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

const deleteInvestCategoryById = async(id)=>{
    try{
        const response = await axios.delete(BASE_URL+`/category/${id}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

const deleteInvestmentById = async(id)=>{
    try{
        const response = await axios.delete(BASE_URL+`/${id}`);

        return response;

    }catch(error){
        throw error;
    }
}

const addNewInvestmentCategory = async(category)=>{

    try{

        axios.defaults.withCredentials = true;

        console.log(category)

        const response = await axios.post(BASE_URL+'/category',category);

        return response.data;

    }catch(error){
        throw error;
    }
}

const addNewInvestment = async(newInvestData)=>{

    try{

        const response = await axios.post(BASE_URL,newInvestData);

        return response;

    }catch(error){
        throw error;
    }
}

const updateInvestment = async(id,newInvestData)=>{

    try{

        const response = await axios.put(BASE_URL+`/${id}`,newInvestData);

        return response.status;

    }catch(error){
        throw error;
    }
}


export {fetchAllInvestments,fetchInvestmentsByMonth,fetchAllInvestmentCategories, deleteInvestCategoryById, 
     addNewInvestmentCategory, deleteInvestmentById, fetchInvestmentsByMonthYearAndUser,
     fetchInvestmentsByMonthAndYear,addNewInvestment, fetchAllInvestmentCategoriesByUser,
     fetchInvestmentById,updateInvestment, fetchInvestmentByUserAndYear}

