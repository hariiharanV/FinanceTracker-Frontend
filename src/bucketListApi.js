import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL+'/bucketList'

const fetchBucketList = async (year) => {
    try {
      if(year)
      {
        console.log('INside bucket list'+year)
        const response = await axios.get(BASE_URL+`/${year}`); 
        return response.data; 
      }
    } catch (error) {
      console.error('Error fetching BucketList:', error);
      throw error; 
    }
  };

  const fetchBucketListByUserAndYear = async (username,year) => {
    try {
      if(year && username)
      {
        const response = await axios.get(BASE_URL+`/username/${username}/year/${year}`); 
        return response.data; 
      }
    } catch (error) {
      console.error('Error fetching BucketList:', error);
      throw error; 
    }
  };

  const addBucketList = async (bucketData) => {
    try {

      const response = await axios.post(BASE_URL,bucketData); 
      return response.data; 
    } catch (error) {
      console.error('Error creating BucketList:', error);
      throw error; 
    }
  };
  
  const updateBucketList = async(id,bucketData) => {
    try {

      const response = await axios.put(BASE_URL+`/${id}`,bucketData); 
      return response.data; 
    } catch (error) {
      console.error('Error creating BucketList:', error);
      throw error; 
    }
  }; 


  export {fetchBucketList, addBucketList, updateBucketList, fetchBucketListByUserAndYear}
