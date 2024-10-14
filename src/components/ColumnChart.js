import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const countryVisitorCount = data.reduce((acc, booking) => {
    const totalVisitors = booking.adults + booking.children + booking.babies;
    acc[booking.country] = (acc[booking.country] || 0) + totalVisitors;
    return acc;
  }, {});

  const options = {
    chart: { id: 'visitors-per-country' },
    xaxis: { categories: Object.keys(countryVisitorCount), title: { text: 'Country' } },
    yaxis: { title: { text: 'Total Visitors' } },
    title: { text: 'Number of Visitors per Country' },
  };

  const series = [{ name: 'Visitors', data: Object.values(countryVisitorCount) }];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default ColumnChart;
