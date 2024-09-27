'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { Question } from '../types/types';
import Input from '../components/Input';

const Questions = () => {
  const [questionName, setQuestion] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [model, setModel] = useState<boolean>(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleModel = () => {
    setModel(!model);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post<Question>('/api/questions', {
        questionName,
        category,
      });

      setQuestion('');
      setCategory('');
      setModel(false); // Close modal after submit
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="px-14 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h2>Total Questions: 10</h2>
        <div>
          <button
            type="button"
            onClick={handleModel}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
          >
            Add question
          </button>
        </div>
      </div>

      {/* Modal */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-5">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Question</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <Input value={questionName} onChange={handleQuestionChange} placeholder="Enter your question" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Input value={category} onChange={handleCategoryChange} placeholder="Enter the category" />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModel}
                  className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
