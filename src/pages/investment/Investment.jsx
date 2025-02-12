import React,{useState,useEffect, useContext} from 'react'
import MonthlyInvestment from '../../components/MonthlyInvestment/MonthlyInvestment'
import { fetchInvestmentsByMonthYearAndUser, fetchAllInvestmentCategoriesByUser } from '../../investApi'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Investment = ({title,filteredInvestments,currentYear}) => {

   const [investData,setInvestData] = useState([]);
   const [investmentModified,setInvestmentModified] = useState(false);
   const [investmentTypes,setInvestmentTypes] = useState([]);
   const [investmentTypesModified, setInvestmentTypesModified] = useState(false);

   const {userData} = useContext(AppContext);

   const navigate = useNavigate();
 
   
   useEffect(()=>{

       const fetchAllInvestTypes = async()=>{

          const username = userData.email;

           const investTypes = await fetchAllInvestmentCategoriesByUser(username);
           setInvestmentTypes(investTypes);
       }

       fetchAllInvestTypes();

       setInvestmentTypesModified(false);

   },[investmentTypesModified,userData])

   useEffect(()=>{

       const loadInvestments = async()=>{

        //  const investResponse = await fetchInvestmentsByMonthAndYear(title,currentYear);

        const username = userData.email;

        const investResponse = await fetchInvestmentsByMonthYearAndUser(title,currentYear,username);

           setInvestData(investResponse);
       }

       loadInvestments();
       setInvestmentModified(false);

   },[investmentModified,currentYear,userData])


  useEffect(()=>{

    setInvestData(filteredInvestments);

  },[filteredInvestments])


  return (
    <>
        {/* <Navbar title={title} setSearchTerm={setSearchTerm} setFilteredInvestments={setFilteredInvestments}/> */}
        
        <MonthlyInvestment title={title} investData={investData} currentYear={currentYear}
        investmentTypes={investmentTypes} 
        investmentModified={investmentModified} setInvestmentModified={setInvestmentModified}
          setInvestmentTypesModified={setInvestmentTypesModified}
        />
    </>
  )
}

export default Investment