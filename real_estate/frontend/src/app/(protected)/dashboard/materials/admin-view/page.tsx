import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditMaterial = () => {
    const { id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        supplier: '',
        material_type: '',
        name: '',
        quantity: '',
        quantity_unit: '',
        price: '',
        price_unit: '',
        material_image: null,
    });

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await axios.get(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/materials/${id}/`);
                setFormData(response.data);
            } catch (error) {
                console.error('There was an error fetching the material!', error);
            }
        };

        fetchMaterial();
    }, [id]);

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
            material_image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.put(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/materials/${id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Material updated successfully');
            history.push('/materials');
        } catch (error) {
            console.error('There was an error updating the material!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Supplier</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
            </div>
            <div>
                <label>Material Type</label>
                <input type="text" name="material_type" value={formData.material_type} onChange={handleChange} required />
            </div>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
                <label>Quantity Unit</label>
                <input type="text" name="quantity_unit" value={formData.quantity_unit} onChange={handleChange} required />
            </div>
            <div>
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Price Unit</label>
                <input type="text" name="price_unit" value={formData.price_unit} onChange={handleChange} required />
            </div>
            <div>
                <label>Material Image</label>
                <input type="file" name="material_image" onChange={handleFileChange} />
            </div>
            <button type="submit">Update Material</button>
        </form>
    );
};

export default EditMaterial;
