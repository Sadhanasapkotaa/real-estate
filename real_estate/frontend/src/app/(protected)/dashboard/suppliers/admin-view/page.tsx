import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/suppliers/');
                setSuppliers(response.data);
            } catch (error) {
                console.error('There was an error fetching the suppliers!', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/suppliers/${id}`);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        } catch (error) {
            console.error('There was an error deleting the supplier!', error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.id}>
                        <td>
                            {supplier.supplier_image && <img src={supplier.supplier_image} alt={supplier.name} width="50" />}
                        </td>
                        <td>{supplier.name}</td>
                        <td>
                            <Link to={`/suppliers/${supplier.id}`}>See More</Link>
                        </td>
                        <td>
                            <Link to={`/suppliers/edit/${supplier.id}`}>Edit</Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(supplier.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SupplierList;
