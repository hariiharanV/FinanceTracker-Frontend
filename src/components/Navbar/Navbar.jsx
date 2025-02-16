import React, { useContext, useState, useEffect } from 'react';
import { fetchExpensesByMonthYearAndUser } from '../../api.js';
import { fetchInvestmentsByMonthYearAndUser } from '../../investApi.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

const Navbar = ({ setIsModelOpen, setIsBucketModelOpen, currentYear, setSearchTerm, setCurrentYear, setFilteredInvestments, setFilteredExpenses, monthlyIncome }) => {
  const browserEndpoint = `${window.location.origin}${window.location.pathname}`;
  const curntYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => curntYear + i);
  const { userData, backendURL, setUserData, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const storedMonth = sessionStorage.getItem('month');
    if (storedMonth) {
      setTitle(storedMonth);
    }
  }, [location.pathname]);

  const handleSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const username = userData.email;

    if (browserEndpoint.includes('monthlyExpense')) {
      const fetchedData = await fetchExpensesByMonthYearAndUser(title, currentYear, username);
      const filtered = fetchedData.filter((expense) => Object.values(expense).some((val) => String(val).toLowerCase().includes(value)));
      setFilteredExpenses(filtered);
    } else if (browserEndpoint.includes('monthlyInvestment')) {
      const fetchedData = await fetchInvestmentsByMonthYearAndUser(title, currentYear, username);
      const filtered = fetchedData.filter((investment) => Object.values(investment).some((val) => String(val).toLowerCase().includes(value)));
      setFilteredInvestments(filtered);
    }
  };

  return (
    <div className="navbar bg-base-100 flex flex-wrap p-3 md:p-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl md:text-2xl" href="/financeTracker">
          {browserEndpoint.includes('monthlyExpense') ? `${title} - Expenses` :
           browserEndpoint.includes('monthlyInvestments') ? `${title} - Investments` : 'Finance Tracker'}
        </a>
        <select onChange={(e) => setCurrentYear(e.target.value)} className="ml-1 bg-gray-700  text-white border rounded-xl p-1 text-sm cursor-pointer">
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex-none flex items-center gap-3 flex-wrap">
        {monthlyIncome && browserEndpoint.includes('monthlyExpense') && (
          <button className="btn btn-outline btn-info text-sm md:text-base" onClick={() => setIsModelOpen(true)}>
            Add Expense
          </button>
        )}
        {browserEndpoint.includes('monthlyExpense') || browserEndpoint.includes('monthlyInvestment') ? (
          <motion.input
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className="input input-bordered text-blue-900 w-40 md:w-60 md:hover:w-80 transition-all duration-300"
          />
        ) : null}

        {/* Show Bucket List button only on medium and larger screens */}
        <motion.button
          initial={{ opacity: 0, x: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex btn btn-outline btn-primary text-sm md:text-base"
          onClick={() => setIsBucketModelOpen(true)}
        >
          Bucket List
        </motion.button>

        {userData && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 border border-purple-800 rounded-full flex items-center justify-center text-2xl">
                {userData.name[0].toUpperCase()}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-48 p-2">
              {!userData.isAccountVerified && (
                <li onClick={() => navigate('/email-verify')} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verify Email
                </li>
              )}
              <li onClick={() => setIsBucketModelOpen(true)} className="py-1 px-2 hover:bg-gray-200 cursor-pointer md:hidden">
                Bucket List
              </li>
              <li onClick={() => navigate('/logout')} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
