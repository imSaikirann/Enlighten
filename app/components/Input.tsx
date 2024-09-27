import React, { FC} from "react";
import { InputProps } from "../types/types";


const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder={placeholder || "Enter your question"}
    />
  );
};

export default Input;
