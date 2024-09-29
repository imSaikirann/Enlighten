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
        setError(err);
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
    <div className="p-4 sm:p-6 lg:px-14 ">
      {questions.length === 0 ? (
        <div className="text-center">No questions found</div>
      ) : (
        <div className="flex flex-col space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-gray-900 shadow-md border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{question.questionName}</h2>
              <p className="text-gray-100 mb-4">Category: {question.category}</p>

              <h3 className="text-lg font-medium mt-2 mb-2">Answers:</h3>
              {question.answers.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1">
                  {question.answers.map((answer) => (
                    <li key={answer.id} className="text-gray-100 border-b border-gray-600 pb-2 mb-2">
                      {answer.answerText}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No answers available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
