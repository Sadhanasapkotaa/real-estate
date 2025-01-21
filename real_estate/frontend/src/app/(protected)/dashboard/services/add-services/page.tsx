"use client";
import React, { useState } from 'react';
import axios from 'axios';

const AddServicePage = () => {
  const [formData, setFormData] = useState({
    service_type: 'other',
    service_provider: '',
    provider_type: 'individual',
    service_name: '',
    service_charge: '',
    time_of_service: '',
    service_description: '',
    service_image: null,
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
      service_image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.post('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/services/', data)
      .then(response => {
        console.log('Service added successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the service!', error);
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Service</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <label style={{ display: 'block' }}>
            Service Type:
            <select name="service_type" value={formData.service_type} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="engineering">Engineering</option>
              <option value="measuring">Measuring</option>
              <option value="legal">Legal</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="landscaping">Landscaping</option>
              <option value="painting">Painting</option>
              <option value="security">Security</option>
              <option value="moving">Moving</option>
              <option value="renovation">Renovation</option>
              <option value="cleaning">Cleaning</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            Service Provider:
            <input type="text" name="service_provider" value={formData.service_provider} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>
          <label style={{ display: 'block' }}>
            Provider Type:
            <select name="provider_type" value={formData.provider_type} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            Service Name:
            <input type="text" name="service_name" value={formData.service_name} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>
          <label style={{ display: 'block' }}>
            Service Charge:
            <input type="number" name="service_charge" value={formData.service_charge} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>
          <label style={{ display: 'block' }}>
            Time of Service:
            <input type="text" name="time_of_service" value={formData.time_of_service} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </label>
        </div>
        <label style={{ display: 'block', marginTop: '20px' }}>
          Service Description:
          <textarea name="service_description" value={formData.service_description} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
        </label>
        <label style={{ display: 'block', marginTop: '20px' }}>
          Service Image:
          <input type="file" name="service_image" onChange={handleFileChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>Add Service</button>
      </form>
    </div>
  );
}

export default AddServicePage;
