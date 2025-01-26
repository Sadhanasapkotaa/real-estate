"use client"; // Ensure the component is treated as a client component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '../../../../hoc/withAuth'; // Adjust the import path as needed

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/suppliers/');
                setSuppliers(response.data);
            } catch (error) {
                console.error('There was an error fetching the suppliers!', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/suppliers/${id}`);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        } catch (error) {
            console.error('There was an error deleting the supplier!', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b">Photo</th>
                        <th className="px-6 py-3 border-b">Name</th>
                        <th className="px-6 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td className="px-6 py-4 border-b">
                                {supplier.supplier_image && (
                                    <img src={supplier.supplier_image} alt={supplier.name} width="50" className="rounded-full" />
                                )}
                            </td>
                            <td className="px-6 py-4 border-b">{supplier.name}</td>
                            <td className="px-6 py-4 border-b">
                                <a 
                                    href={`/suppliers/${supplier.id}`} 
                                    className="text-blue-500 hover:text-blue-700">
                                    See More
                                </a>
                            </td>
                            <td className="px-6 py-4 border-b">
                                <a 
                                    href={`/suppliers/edit/${supplier.id}`} 
                                    className="text-yellow-500 hover:text-yellow-700">
                                    Edit
                                </a>
                            </td>
                            <td className="px-6 py-4 border-b">
                                <button 
                                    onClick={() => handleDelete(supplier.id)} 
                                    className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default withAuth(SupplierList);