"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = () => {
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data:any) => {
    setFormData(data);
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Address Management Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { name: 'cellPhoneNumber', label: 'Cell Phone Number', type: 'tel', pattern: /^[0-9]{10}$/ },
          { name: 'currentUniqueId', label: 'Current Unique ID', type: 'text' },
          { name: 'salutation', label: 'Salutation', type: 'text' },
          { name: 'firstName', label: 'First Name', type: 'text' },
          { name: 'lastName', label: 'Last Name', type: 'text' },
          { name: 'address1', label: 'Address 1', type: 'text' },
          { name: 'address2', label: 'Address 2', type: 'text' },
          { name: 'city', label: 'City', type: 'text' },
          { name: 'state', label: 'State', type: 'text' },
          { name: 'country', label: 'Country', type: 'text' },
          { name: 'pincode', label: 'Pincode', type: 'text', pattern: /^[0-9]{6}$/ },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              {...register(field.name, { 
                required: `${field.label} is required`,
                pattern: field.pattern ? {
                  value: field.pattern,
                  message: `Invalid ${field.label}`
                } : undefined
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 ${errors[field.name] ? 'border-red-500' : ''}`}
              onFocus={() => setFocus(field.name)}
            />
            {errors[field.name]?.message && (
            <p className="mt-1 text-sm text-red-600">{String(errors[field.name]?.message)}</p>
          )}
          </div>
        ))}
        
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            {...register('comments')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
      
      {formData && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <h3 className="text-lg font-medium text-green-800">Form Submitted Successfully!</h3>
          <pre className="mt-2 text-sm text-green-700">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddressForm;