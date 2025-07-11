import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function movingAverage(arr, windowSize) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = arr.slice(start, i + 1);
    result.push(window.reduce((sum, v) => sum + v, 0) / window.length);
  }
  return result;
}

const SalesTrends = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/daily-sales')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading sales trends…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No daily sales data.</p>;

  const dates = data.map(d => (new Date(d.Date)).toLocaleDateString());
  const amounts = data.map(d => d.Amount);
  const ma7 = movingAverage(amounts, 7);

  return (
    <div>
      <h2>Sales Trends (with 7-Day Moving Average)</h2>
      <p className="section-desc">Visualize daily sales and a smoothed 7-day moving average to spot trends.</p>
      <Plot
        data={[
          {
            x: dates,
            y: amounts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Daily Sales',
            marker: { color: 'royalblue', size: 7 },
            line: { width: 2 },
          },
          {
            x: dates,
            y: ma7,
            type: 'scatter',
            mode: 'lines',
            name: '7-Day Moving Avg',
            line: { color: 'orange', width: 4, dash: 'dash' },
          }
        ]}
        layout={{
          title: '',
          xaxis: {
            title: 'Date',
            tickangle: -45,
            tickfont: { size: 11 },
            rangeslider: { visible: true },
            automargin: true,
          },
          yaxis: { title: 'Amount', automargin: true },
          height: 500,
          legend: { orientation: 'h', x: 1, y: 1.08, xanchor: 'right', yanchor: 'top' },
          margin: { t: 30, l: 60, r: 30, b: 90 },
        }}
      />
    </div>
  );
};

export default SalesTrends; 