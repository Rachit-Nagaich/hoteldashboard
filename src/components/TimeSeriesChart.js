import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const seriesData = data.map((booking) => ({
    x: booking.arrivalDate,  
    y: booking.adults + booking.children + booking.babies
  }));

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      type: 'datetime',  
    },
    yaxis: {
      title: {
        text: 'Number of Visitors'
      }
    }
  };

  const series = [{
    name: 'Visitors',
    data: seriesData
  }];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
