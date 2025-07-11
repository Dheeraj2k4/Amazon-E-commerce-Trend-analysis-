import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const TopCategories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/category-sales')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading top categories…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No category sales data.</p>;

  // Sort by Amount descending and take top 5
  const top = [...data].sort((a, b) => b.Amount - a.Amount).slice(0, 5);

  return (
    <div>
      <h2>Top 5 Categories by Sales</h2>
      <p className="section-desc">The five product categories with the highest total sales.</p>
      <Plot
        data={[{
          x: top.map(d => d.Amount),
          y: top.map(d => d.Category),
          type: 'bar',
          orientation: 'h',
          marker: { color: 'mediumseagreen' },
        }]}
        layout={{
          title: '',
          xaxis: { title: 'Amount' },
          yaxis: { title: 'Category', automargin: true },
          height: 350,
        }}
      />
    </div>
  );
};

export default TopCategories; 