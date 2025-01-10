import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string | null) => void; // Expecting string in DDMMMYYYY format
  label: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, label }) => {

  // Convert string (DDMMMYYYY) to Date object
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const day = dateString.substring(0, 3);
    const month = dateString.substring(3, 6); // First three characters represent month (e.g. Jan, Feb, etc.)
    const year = dateString.substring(6); // The last part is the year (e.g. 2024)
    
    // Convert month string (Jan, Feb, etc.) to month index (0-11)
    const monthIndex = new Date(`${month} 1, 2000`).getMonth(); // Using a dummy date to get the index
    return new Date(`${year}-${monthIndex + 1}-${day}`);
  };

  // Convert Date object to string (DDMMMYYYY)
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-'); // Remove space between day, month, and year
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Format the Date object back to DDMMMYYYY
      const formattedDate = formatDate(date);
      onChange(formattedDate); // Send formatted date to parent
    } else {
      onChange(null); // Handle empty date
    }
  };

  return (
    <div className="date-picker-container">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate ? parseDate(selectedDate) : null} // Parse the selected date to a Date object
        onChange={handleDateChange} // Pass formatted date back to parent
        dateFormat="ddMMMyyyy" // Format that matches DDMMMYYYY
        className="date-picker-input"
        placeholderText="Select Date"
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
};

export default CustomDatePicker;
