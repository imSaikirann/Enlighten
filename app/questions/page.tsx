'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Question, Category } from '../types/types';
import Input from '../components/Input';
import { useAppDispatch,useAppSelector } from "../store/hooks";
import { fetchData } from "../store/categorySlice";
const Questions = () => {
  const [questionName, setQuestion] = useState<string>(''); 

  const [model, setModel] = useState<boolean>(false);
  const [data, setData] = useState<Question[]>([]);
  const [category, setCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const dispatch = useAppDispatch()
  const categories: Category[] = useAppSelector((state) => state.items);
  const dataStatus = useAppSelector((state) => state.status);
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
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
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData());
    }
    console.log(data) 
  }, [dispatch, dataStatus,data]);

  useEffect(() => {
    getData();  
    dispatch(fetchData());
  }, [dispatch]);


  const filterQuestions = selectedCategory === "All"
    ? data
    : data.filter((question) => question.category === selectedCategory);



  return (
    <div className="px-4 py-8 bg-black md:px-14 max-w-full h-full mx-auto">
      <div className="flex  mt-[120px] flex-col-reverse gap-8 md:flex-row">
        
        {/* Left: Questions List */}
        <div className="md:w-2/3 w-full bg-boxColor p-4 md:p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Questions List</h2>
          <div className="space-y-4">
            {filterQuestions.length > 0 ? (
              filterQuestions.map((question, index) => (
                <div key={index} className="bg-boxColor p-4 rounded-md border border-gray-700">
                  <p className="text-lg font-medium text-white mb-2">{question.questionName}</p>
                  <span className="text-sm text-indigo-400">{question.category}</span>
                </div>
              ))
            ) : (
              <p className="text-white">No questions found for the selected category.</p>
            )}
          </div>
        </div>

        {/* Right: Total Questions and Add Button */}
        <div className="md:w-1/3 w-full bg-boxColor p-6 rounded-lg shadow-lg flex flex-col space-y-6">
          
          {/* Total Questions */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Total Questions: {data.length}</h2>
          </div>

          {/* Add Question Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleModel}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Question
            </button>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto md:overflow-visible md:flex-wrap justify-start gap-2 py-2 whitespace-nowrap">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full ${selectedCategory === "All" ? 'bg-indigo-200' : 'bg-indigo-100'} text-indigo-800 font-medium hover:bg-indigo-200 transition duration-300`}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                onClick={() => setSelectedCategory(category.name)}
                key={index}
                className={`px-4 py-2 rounded-full ${selectedCategory === category.name ? 'bg-indigo-200' : 'bg-indigo-100'} text-indigo-800 font-medium hover:bg-indigo-200 transition duration-300`}
              >
                {category.name}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-5">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-lg transform transition-transform duration-300 scale-100 hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Add New Question</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Question</label>
                <Input 
                  value={questionName} 
                  onChange={handleQuestionChange} 
                  placeholder="Enter your question"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-400">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name} className="text-gray-900">{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-lg hover:bg-gray-700 transition duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
