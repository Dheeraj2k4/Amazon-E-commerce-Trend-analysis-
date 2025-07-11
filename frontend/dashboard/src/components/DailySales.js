import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const DailySales = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/daily-sales')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading daily sales…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No daily sales data.</p>;

  return (
    <div>
      <h2>Daily Sales</h2>
      <Plot
        data={[{
          x: data.map(d => (new Date(d.Date)).toLocaleDateString()),
          y: data.map(d => d.Amount),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'royalblue' },
        }]}
        layout={{
          title: 'Sales Over Time',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Amount' },
          height: 350,
        }}
      />
    </div>
  );
};

export default DailySales; 