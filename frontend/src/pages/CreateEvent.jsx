// src/pages/CreateEvent.jsx
import React, { useState } from 'react';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input'; 
import Button from '../components/Button';

const initialEventState = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  ticketTiers: [{ name: 'Standard', price: 1000, quantity: 100 }],
};

const CreateEvent = () => {
  const [eventData, setEventData] = useState(initialEventState);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleTicketChange = (index, e) => {
    const newTiers = [...eventData.ticketTiers];
    newTiers[index][e.target.name] = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setEventData({ ...eventData, ticketTiers: newTiers });
  };
  
  const addTicketTier = () => {
    setEventData({
      ...eventData,
      ticketTiers: [...eventData.ticketTiers, { name: '', price: 0, quantity: 0 }],
    });
  };
  
  const removeTicketTier = (index) => {
    setEventData({
      ...eventData,
      ticketTiers: eventData.ticketTiers.filter((_, i) => i !== index),
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const payload = {
        ...eventData,
        venue: {
          name: eventData.venueName,
          address: eventData.venueAddress,
        },
      };

      const response = await apiService('/events', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (response && response._id) {
        setMessage('Event created successfully! Redirecting...');
        // Example: Navigate to the new event detail page
        setTimeout(() => navigate(`/dashboard/event/${response._id}`), 2000); 
      }
    } catch (error) {
      setMessage(`Creation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step Components ---

  const Step1Details = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">1. Event Basics</h2>
      <FormInput label="Title" name="title" value={eventData.title} onChange={handleChange} required />
      <FormInput label="Description" name="description" value={eventData.description} onChange={handleChange} isTextArea />
      <div className="flex justify-end space-x-2 mt-6">
        <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Next: Schedule & Venue
        </button>
      </div>
    </>
  );

  const Step2Schedule = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">2. Schedule & Venue</h2>
      <FormInput label="Start Time" name="startTime" type="datetime-local" value={eventData.startTime} onChange={handleChange} required />
      <FormInput label="End Time" name="endTime" type="datetime-local" value={eventData.endTime} onChange={handleChange} required />
      <FormInput label="Venue Name" name="venueName" value={eventData.venueName} onChange={handleChange} />
      <FormInput label="Venue Address" name="venueAddress" value={eventData.venueAddress} onChange={handleChange} />
      <div className="flex justify-between space-x-2 mt-6">
        <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
        <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Next: Ticketing
        </button>
      </div>
    </>
  );

  const Step3Ticketing = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">3. Ticketing Tiers</h2>
      {eventData.ticketTiers.map((tier, index) => (
        <div key={index} className="flex space-x-3 mb-3 items-end p-3 border rounded-lg bg-gray-50">
          <FormInput label="Tier Name" name="name" value={tier.name} onChange={(e) => handleTicketChange(index, e)} required />
          <FormInput label="Price (Cents)" name="price" type="number" value={tier.price} onChange={(e) => handleTicketChange(index, e)} required />
          <FormInput label="Quantity" name="quantity" type="number" value={tier.quantity} onChange={(e) => handleTicketChange(index, e)} required />
          {eventData.ticketTiers.length > 1 && (
            <button type="button" onClick={() => removeTicketTier(index)} className="bg-red-500 text-white w-10 h-10 rounded">
              &times;
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addTicketTier} className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded mb-6 hover:bg-indigo-50">
        + Add Ticket Tier
      </button>

      <div className="flex justify-between space-x-2 mt-6">
        <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
        <button type="submit" disabled={isLoading} className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50">
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </>
  );
  
  // Renders the current step component
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Details />;
      case 2:
        return <Step2Schedule />;
      case 3:
        return <Step3Ticketing />;
      default:
        return <Step1Details />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">Create New Event</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`p-2 rounded-full font-bold w-8 h-8 flex items-center justify-center 
            ${s === step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {s}
          </div>
        ))}
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded text-center ${message.startsWith('Event created') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
};

export default CreateEvent;


// Simple Reusable Input Component for cleaner form code
const FormInput = ({ label, name, value, onChange, type = 'text', isTextArea = false, required = false }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {isTextArea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        step={type === 'number' ? '1' : undefined}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    )}
  </div>
);