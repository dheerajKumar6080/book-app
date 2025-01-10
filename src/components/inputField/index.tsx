import React from "react";
import "./index.scss";

export interface InputFieldProps {
  title: string;
  inputType: string;
  value: string | number; // Accepts both string and number for the input value
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void; // Function to handle input changes
}

const InputField: React.FC<InputFieldProps> = ({ title, inputType, value, onChange }) => {
  console.log("InputField");

  return (
    <div className="input-field-container">
      <label className="input-label">{title}</label>
      <input
        className="input-field"
        type={inputType}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
