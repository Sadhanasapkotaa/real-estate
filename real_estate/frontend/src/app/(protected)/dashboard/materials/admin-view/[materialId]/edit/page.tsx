import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MaterialsAdminView = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/materials/');
                setMaterials(response.data);
            } catch (error) {
                console.error('There was an error fetching the materials!', error);
            }
        };

        fetchMaterials();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/materials/${id}/`);
            setMaterials(materials.filter(material => material.id !== id));
        } catch (error) {
            console.error('There was an error deleting the material!', error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Supplier</th>
                    <th>See More</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {materials.map(material => (
                    <tr key={material.id}>
                        <td>{material.name}</td>
                        <td><img src={material.material_image} alt={material.name} width="50" /></td>
                        <td>{material.supplier.name}</td>
                        <td><Link to={`/materials/${material.id}`}>See More</Link></td>
                        <td><Link to={`/materials/${material.id}/edit`}>Edit</Link></td>
                        <td><button onClick={() => handleDelete(material.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MaterialsAdminView;