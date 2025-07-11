import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const StateSales = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/state-sales')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading state sales…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No state sales data.</p>;

  return (
    <div>
      <h2>State Sales</h2>
      <Plot
        data={[{
          x: data.map(d => d.Amount),
          y: data.map(d => d["ship-state"]),
          type: 'bar',
          orientation: 'h',
          marker: { color: 'orange' },
        }]}
        layout={{
          title: 'Sales by State',
          xaxis: { title: 'Amount' },
          yaxis: { title: 'State', automargin: true },
          height: 350,
        }}
      />
    </div>
  );
};

export default StateSales; 