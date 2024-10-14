import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ dateRange, setDateRange }) => {
  return (
    <div>
      <label>Select Date Range:</label>
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(update) => setDateRange(update)}  
        isClearable={true}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    </div>
  );
};

export default DateFilter;
