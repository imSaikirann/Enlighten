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
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number>(0); // New state for answer scrolling

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
              <h2 className="text-md font-semibold mb-2 md:text-xl text-gray-200">
                {question.questionName}
              </h2>
              <p className="text-gray-500 mb-4 text-sm">
                Category: {question.category}
              </p>

              {question.answers.length > 0 ? (
                <div className="flex flex-col space-y-4">
                  {/* Display the current answer */}
                  <div className="text-gray-300 border md:text-lg border-gray-900 p-3 rounded-md">
                    {question.answers[currentAnswerIndex]?.answerText}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentAnswerIndex((prev) => Math.max(prev - 1, 0))}
                      disabled={currentAnswerIndex === 0}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() =>
                        setCurrentAnswerIndex((prev) =>
                          Math.min(prev + 1, question.answers.length - 1)
                        )
                      }
                      disabled={currentAnswerIndex === question.answers.length - 1}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
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
