import Expense from "./pages/expense/Expense"
import { useState, useEffect, useContext } from "react";
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Investment from "./pages/investment/Investment";
import Navbar from "./components/Navbar/Navbar";
import BucketList from "./components/BucketList/BucketList";
import FinanceTrackerHome from "./pages/home/FinanceTrackerHome";
import { AppContext } from "./context/AppContext";
import PrivateRoute from './routes/PrivateRoute'
import axios from 'axios'

function App() {

  // const [title,setTitle] = useState(()=>{
  //   return sessionStorage.getItem("title") || "Expense-Tracker";
  // });

  // useEffect(() => {
  //   sessionStorage.setItem("title", title);
  // }, [title]);

  const [title,setTitle] = useState('Finance-Tracker')
  const location = useLocation(); 

   axios.defaults.withCredentials = true;

  const {isLoggedIn} = useContext(AppContext);


  {/* Expenses */}
   const [expenseModified,setExpenseModified] = useState(false);
   const [isModelOpen, setIsModelOpen] = useState(false);
   const [expensesList,setExpensesList] = useState([])
   const [filteredExpenses, setFilteredExpenses] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
  const [monthlyIncome,setMonthlyIncome] = useState('');
  const [currentYear,setCurrentYear] = useState('2025');

  {/*Investments */}
    const [filteredInvestments,setFilteredInvestments] = useState([]);

    const [isBucketModelOpen,setIsBucketModelOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
      setShowNav(location.pathname.includes('/financeTracker'));

      setTitle(sessionStorage.getItem("month")) //added
      console.log("checking nav")
    }, [location.pathname]); 




  return (
    <>
          {showNav &&  <Navbar title={title} setExpenseModified={setExpenseModified}
        monthlyIncome={monthlyIncome} setIsModelOpen={setIsModelOpen} expensesList={expensesList}
        setTitle={setTitle} setFilteredExpenses={setFilteredExpenses} 
        setSearchTerm={setSearchTerm} setCurrentYear={setCurrentYear} currentYear={currentYear}
          filteredInvestments={filteredInvestments} setFilteredInvestments={setFilteredInvestments}
          setIsBucketModelOpen={setIsBucketModelOpen}
        />}

        <BucketList isBucketModelOpen={isBucketModelOpen} currentYear={currentYear} setIsBucketModelOpen={setIsBucketModelOpen}/>

        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>

             {/* Protected Routes */}
             <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
              <Route path="/email-verify" element={<EmailVerify/>}></Route>
              <Route path="/reset-password" element={<ResetPassword/>}></Route>
            

              <Route path="/financeTracker" element={<FinanceTrackerHome title={title} setTitle={setTitle} currentYear={currentYear}/>}/>
              <Route path="/financeTracker/monthlyExpense" element={<Expense title={title} setTitle={setTitle} 
                expenseModified={expenseModified} setExpenseModified={setExpenseModified}
                isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} expensesList={expensesList}
                setExpensesList={setExpensesList} setFilteredExpenses={setFilteredExpenses}
                filteredExpenses={filteredExpenses} monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome} currentYear={currentYear}
              />}/>
              <Route path="/financeTracker/monthlyInvestments" element={<Investment title={title} currentYear={currentYear} filteredInvestments={filteredInvestments}/>}/>

            </Route>
        </Routes>
    </>
  )
}

export default App
