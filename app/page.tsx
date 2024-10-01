'use client'
import { useEffect, useState } from "react";
import { useAppDispatch,useAppSelector } from "./store/hooks";
import { Question,Category} from "./types/types";
import { fetchData } from "./store/categorySlice";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number>(0);
  const [answerLoading, setAnswerLoading] = useState(false); 

  const dispatch = useAppDispatch();
  const data: Category[] = useAppSelector((state) => state.items);
  const dataStatus = useAppSelector((state) => state.status);

  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, dataStatus]);

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

  const handleAnswerChange = (newIndex: number) => {
    setAnswerLoading(true);
    setTimeout(() => {
      setCurrentAnswerIndex(newIndex);
      setAnswerLoading(false);
    }, 300);
  };

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
    <div className="p-3 sm:p-6 lg:px-14 bg-black min-h-screen flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Questions Section */}
    <div className="mt-[120px] flex flex-col-reverse  lg:flex-row lg:space-x-2 ">
    <div className="lg:w-3/4 w-full">
        {questions.length === 0 ? (
          <div className="text-center text-gray-500">No questions found</div>
        ) : (
          <div className="] space-y-6">
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
                    {answerLoading ? (
                      <div role="status" className="max-w-xl animate-pulse">
                        {/* Skeleton loader */}
                      </div>
                    ) : (
                      <div className="text-gray-300 md:text-lg p-1 rounded-md">
                        {question.answers[currentAnswerIndex]?.answerText}
                      </div>
                    )}

                    <div className="flex space-x-2 items-center">
                      <button
                        onClick={() =>
                          handleAnswerChange(Math.max(currentAnswerIndex - 1, 0))
                        }
                        disabled={currentAnswerIndex === 0}
                        className="text-gray-500 hover:text-blue-500"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() =>
                          handleAnswerChange(
                            Math.min(
                              currentAnswerIndex + 1,
                              question.answers.length - 1
                            )
                          )
                        }
                        disabled={
                          currentAnswerIndex === question.answers.length - 1
                        }
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

      {/* Tags Section */}
      <div className="  lg:w-1/4 w-full  bg-boxColor p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
        <div className="flex overflow-x-auto md:overflow-visible md:flex-wrap justify-start gap-2 py-2 whitespace-nowrap scrollbar-hide">
  {data.map((category, index) => (
    <button
      key={index}
      className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 hover:scale-105 transition duration-300 ease-in-out shadow-md"
    >
      {category.name}
    </button>
  ))}
</div>

      </div>
    </div>
    </div>
  );
}
