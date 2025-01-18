import React, { useState } from 'react';
import axios from 'axios';

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
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/suppliers/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Supplier added successfully');
        } catch (error) {
            console.error('There was an error adding the supplier!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
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
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <div>
                <label>Map Link:</label>
                <input type="text" name="maplink" value={formData.maplink} onChange={handleChange} />
            </div>
            <div>
                <label>Website:</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} />
            </div>
            <div>
                <label>Supplier Image:</label>
                <input type="file" name="supplier_image" onChange={handleFileChange} />
            </div>
            <button type="submit">Add Supplier</button>
        </form>
    );
};

export default AddSupplier;