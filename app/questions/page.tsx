'use client';
import axios from 'axios';
import React, { useState } from 'react';

const Questions = () => {
  const [questionName, setQuestion] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
     await axios.post('/api/questions', {
        questionName,
        category,
      });

     
      alert("Done")
   
      setQuestion('');
      setCategory('');

    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add more specific error handling if needed
    }
  };

  return (
    <div className="px-14 py-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            value={questionName}
            onChange={handleQuestionChange}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your question"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the category"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questions;
