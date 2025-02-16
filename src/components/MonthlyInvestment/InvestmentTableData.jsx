import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormatDateToDDMMYYYY from '../../utils/FormatDateToDDMMYYYY';
import { deleteInvestmentById, fetchInvestmentById } from '../../investApi';
import { toast } from 'react-toastify';

const InvestmentTableData = ({ investData, setIsModelOpen, setEditInvestData, setInvestmentModified, setIsEditModelOpen }) => {
    
    const handleEdit = async (id) => {
        console.log('Calling handleEdit');
        setIsEditModelOpen(true);
        const response = await fetchInvestmentById(id);
        if (response) {
            setEditInvestData(response);
        }
    };

    const handleDelete = async (id) => {
        const response = await deleteInvestmentById(id);
        if (response.status === 200) {
            toast.error('Investment Deleted Successfully');
        }
        setInvestmentModified(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full overflow-x-auto"
        >
            <div className="flex justify-end mb-2">
                <button className="btn btn-outline btn-secondary" onClick={() => setIsModelOpen(true)}>
                    New Investment
                </button>
            </div>

            <table className="table-auto min-w-full border-collapse border border-gray-300">
                {/* Table Header */}
                <thead className="bg-gray-100 text-xs sm:text-sm">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Investment Type</th>
                        <th className="p-2 border">Investment Date</th>
                        <th className="p-2 border">Investment Category</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Invested By</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-xs sm:text-sm">
                    {investData.map((invest, index) => (
                        <tr key={index} className="text-center border">
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{invest.investmentType}</td>
                            <td className="p-2 border">{FormatDateToDDMMYYYY(invest.investmentDate)}</td>
                            <td className="p-2 border">{invest.investmentCategory}</td>
                            <td className="p-2 border">{invest.amount}</td>
                            <td className="p-2 border">{invest.investedBy}</td>
                            <td className="p-2 border">
                                <div className="flex justify-center space-x-3">
                                    {/* Edit Button */}
                                    <button onClick={() => handleEdit(invest.id_invest)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-100" viewBox="0 0 512 512" width="20" height="20" fill="#73a3f8">
                                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                                        </svg>
                                    </button>

                                    {/* Delete Button */}
                                    <button onClick={() => handleDelete(invest.id_invest)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-100" viewBox="0 0 448 512" width="18" height="18" fill="#ff4c2c">
                                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default InvestmentTableData;
