'use client'
import { useEffect, useState } from "react";

interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  createdAt: string;
  updatedAt: string;
}

interface Question {
  id: number;
  questionName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:px-14 bg-black min-h-screen">
      {questions.length === 0 ? (
        <div className="text-center text-gray-500">No questions found</div>
      ) : (
        <div className="flex  mt-[120px] flex-col space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-boxColor shadow-sm border border-black rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-200">{question.questionName}</h2>
              <p className="text-gray-500 mb-4 text-sm">Category: {question.category}</p>

            
              {question.answers.length > 0 ? (
                <ul className=" space-y-2">
                  {question.answers.map((answer) => (
                    <li key={answer.id} className="text-gray-300 border border-gray-900 p-3 rounded-md pb-2">
                      {answer.answerText}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No answers available.</p>
              )}
              <div className="flex justify-between items-center mt-4">
           
                <div className="flex space-x-3">
                  <button className="text-gray-500 hover:text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-red-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
