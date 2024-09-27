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