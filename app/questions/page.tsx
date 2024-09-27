'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Question } from '../types/types';
import Input from '../components/Input';

const Questions = () => {
  const [questionName, setQuestion] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [model, setModel] = useState<boolean>(false);
  const [data, setData] = useState<Question[]>([]);

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
      setModel(false);
      getData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get<Question[]>('/api/questions');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-4 py-8 md:px-14 max-w-7xl mx-auto">
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        {/* Left: Questions List */}
        <div className="md:w-2/3 w-full bg-gray-800 p-4 md:p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Questions List</h2>
          <div className="space-y-4">
            {data.map((question, index) => (
              <div key={index} className="border-b pb-4">
                <p className="text-md md:text-lg font-medium text-white">{question.questionName}</p>
                <span className="text-sm text-gray-400">{question.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Total Questions and Add Button */}
        <div className="md:w-1/3 w-full bg-gray-800 p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-4">Total Questions: {data.length}</h2>
          </div>
          <div>
            <button
              type="button"
              onClick={handleModel}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
            >
              Add Question
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-5">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-lg">
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
