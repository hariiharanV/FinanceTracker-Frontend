import React from 'react';
import { motion } from 'framer-motion';
import CurrencyDisplay from '../../utils/CurrencyDisplay';
import { fetchExpenseById, deleteExpense } from '../../api';
import { toast } from 'react-toastify';
import FormatDateToDDMMYYYY from '../../utils/FormatDateToDDMMYYYY';

const ExpenseTableData = ({ expensesList, setEditExpenseData, setIsEditModelOpen, setExpenseModified }) => {
  const handleDelete = async (id) => {
    const res = await deleteExpense(id);
    toast.error(res);
    setExpenseModified(true);
  };

  const handleEdit = async (id) => {
    setIsEditModelOpen(true);
    const response = await fetchExpenseById(id);
    setEditExpenseData(response);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="w-full px-2 md:px-6"
    >
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200 text-xs md:text-sm">
            <tr>
              <th className="px-2 py-2 border">#</th>
              <th className="px-2 py-2 border">Type</th>
              <th className="px-2 py-2 border">Planned</th>
              <th className="px-2 py-2 border">Date</th>
              <th className="px-2 py-2 border">Given By</th>
              <th className="px-2 py-2 border">Settled By</th>
              <th className="px-2 py-2 border">Final Amt</th>
              <th className="px-2 py-2 border">Note</th>
              <th className="px-2 py-2 border">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-xs md:text-sm">
            {expensesList.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-2 py-2 border text-center">{index + 1}</td>
                <td className="px-2 py-2 border">{expense.expenditureType}</td>
                <td className="px-2 py-2 border">
                  <CurrencyDisplay amount={expense.plannedExpense} />
                </td>
                <td className="px-2 py-2 border">{FormatDateToDDMMYYYY(expense.expenseDate)}</td>
                <td className="px-2 py-2 border">{expense.givenBy}</td>
                <td className="px-2 py-2 border">{expense.settledBy}</td>
                <td className="px-2 py-2 border">
                  <CurrencyDisplay amount={expense.finalAmountSettled} />
                </td>
                <td className="px-2 py-2 border">{expense.note}</td>
                {/* Actions */}
                <td className="px-2 py-2 border text-center">
                  <div className="flex justify-center space-x-3">
                    {/* Edit Button */}
                    <button onClick={() => handleEdit(expense.id)} className="hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#73a3f8">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button onClick={() => handleDelete(expense.id)} className="hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="#ff4c2c">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ExpenseTableData;
