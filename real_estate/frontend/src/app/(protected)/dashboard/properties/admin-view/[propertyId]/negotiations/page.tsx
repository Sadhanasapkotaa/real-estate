"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import withAuth from '../../../../../../hoc/withAuth';

interface Negotiation {
  id: number;
  negotiated_price: string;
  negotiation_reason: string;
  created_at: string;
  property: number;
  owner: number;
  user: number;
}

const NegotiationsPage = () => {
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const { propertyId } = useParams();
  const [propertyPrice, setPropertyPrice] = useState<number | null>(null);

  useEffect(() => {
    if (propertyId) {
      axios.get(`https://new-api-endpoint.com/api/negotiations/?property=${propertyId}`)
        .then(response => {
          setNegotiations(response.data);
        })
        .catch(error => {
          console.error('Error fetching negotiations:', error);
        });

      axios.get(`https://new-api-endpoint.com/api/properties/${propertyId}`)
        .then(response => {
          setPropertyPrice(response.data.price);
        })
        .catch(error => {
          console.error('Error fetching property price:', error);
        });
    }
  }, [propertyId]);

  const handleConfirm = (negotiationId: number, userId: number) => {
    axios.post(`https://new-api-endpoint.com/api/properties/${propertyId}/book`, { status: 'booked' })
      .then(() => {
        axios.post(`https://new-api-endpoint.com/api/notifications/`, {
          user: userId,
          message: 'Your offer has been accepted'
        });

        negotiations.forEach(negotiation => {
          if (negotiation.user !== userId) {
            axios.post(`https://new-api-endpoint.com/api/notifications/`, {
              user: negotiation.user,
              message: 'Your offer has been declined'
            });
          }
        });

        alert('Property status updated and notifications sent.');
      })
      .catch(error => {
        console.error('Error updating property status:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Negotiations for Property ID: {propertyId}</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Negotiated Price</th>
            <th className="px-4 py-2 text-left">Reason</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {negotiations.map(negotiation => (
            <tr key={negotiation.id} className={`border-b border-gray-200 ${propertyPrice && parseFloat(negotiation.negotiated_price) > propertyPrice ? 'bg-green-100' : 'bg-red-100'}`}>
              <td className={`px-4 py-2 font-bold ${propertyPrice && parseFloat(negotiation.negotiated_price) > propertyPrice ? 'text-green-500' : 'text-red-500'}`}>
                ${negotiation.negotiated_price}
              </td>
              <td className="px-4 py-2">{negotiation.negotiation_reason}</td>
              <td className="px-4 py-2">{new Date(negotiation.created_at).toLocaleString()}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleConfirm(negotiation.id, negotiation.user)}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(NegotiationsPage);