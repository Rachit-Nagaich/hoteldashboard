import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SparklineChart = ({ data, label }) => {
  const seriesData = data.map(booking => label === 'Adults' ? booking.adults : booking.children);

  const options = {
    chart: { type: 'line', sparkline: { enabled: true } },
    title: { text: `Total ${label} Visitors` },
  };

  const series = [{ name: label, data: seriesData }];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={100}
    />
  );
};

export default SparklineChart;
