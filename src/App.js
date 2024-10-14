import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import DateFilter from './components/DateFilter';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [dateRange, setDateRange] = useState([null, null]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('/path/to/hotel_bookings_1000.csv'); 

        
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map((row) => {
              
              const arrivalDate = new Date(
                row.arrival_date_year,
                row.arrival_date_month - 1, 
                row.arrival_date_day_of_month
              );

              return {
                ...row,
                arrivalDate,  
                adults: Number(row.adults) || 0,
                children: Number(row.children) || 0,
                babies: Number(row.babies) || 0,
              };
            });
            setData(parsedData);
            setFilteredData(parsedData); 
          },
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const filtered = data.filter((booking) => {
        const bookingDate = booking.arrivalDate;  
        return bookingDate >= dateRange[0] && bookingDate <= dateRange[1];
      });
      setFilteredData(filtered);  
    }
  }, [dateRange, data]);

  const handleApplyFilter = () => {
    setDateRange(selectedDateRange);  
  };

  return (
    <div className="app-container">
      <h1>Hotel Booking Dashboard</h1>
      <DateFilter dateRange={selectedDateRange} setDateRange={setSelectedDateRange} />
      <button className="apply-filter-btn" onClick={handleApplyFilter}>
        Apply Filter
      </button>
      <TimeSeriesChart data={filteredData} />
      <ColumnChart data={filteredData} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SparklineChart data={filteredData} label="Adults" />
        <SparklineChart data={filteredData} label="Children" />
      </div>
    </div>
  );
};

export default App;
