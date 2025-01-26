"use client";
import React, { useState } from 'react';
import axios from 'axios';
import withAuth from '../../../../hoc/withAuth'; // Adjust the import path as needed

const AddSupplier = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        phone_number: '',
        maplink: '',
        website: '',
        supplier_image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            supplier_image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.supplier_image) {
            setError('Please upload an image.');
            return;
        }
        setError(null);  // Reset any previous error
        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/suppliers/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setLoading(false);
            setSuccessMessage('Supplier added successfully!');
            setFormData({
                name: '',
                type: '',
                description: '',
                phone_number: '',
                maplink: '',
                website: '',
                supplier_image: null,
            });
        } catch (error) {
            setLoading(false);
            setError('There was an error adding the supplier. Please try again later.');
            console.error('There was an error adding the supplier!', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Type</option>
                        <option value="cement">Cement Supplier</option>
                        <option value="steel">Steel Supplier</option>
                        <option value="electrical">Electrical Supplier</option>
                        <option value="manpower">Manpower Supplier</option>
                        <option value="plumbing">Plumbing Supplier</option>
                        <option value="paint">Paint Supplier</option>
                        <option value="tiles">Tiles Supplier</option>
                        <option value="wood">Wood Supplier</option>
                        <option value="glass">Glass Supplier</option>
                        <option value="furniture">Furniture Supplier</option>
                        <option value="iot">IOT Technology</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Map Link:</label>
                    <input
                        type="text"
                        name="maplink"
                        value={formData.maplink}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Website:</label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Supplier Image:</label>
                    <input
                        type="file"
                        name="supplier_image"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? 'Adding Supplier...' : 'Add Supplier'}
                </button>
            </form>
        </div>
    );
};

export default withAuth(AddSupplier);