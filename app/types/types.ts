import  {  ChangeEvent } from "react";

export interface Question {
    questionName: string;
    category: string;
}

 export interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }


export interface Category  {
    id: string;
    name: string;
};
  

export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  createdAt: string;
  updatedAt: string;
}

 export interface Question {
  id: number;
  questionName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}