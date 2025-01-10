import React from 'react';
import './index.scss';

interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, label }) => {
  return (
    <div className="dropdown-container">
      <label className="input-label">{label}</label>
      <select value={value} onChange={onChange} className="dropdown-select">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
