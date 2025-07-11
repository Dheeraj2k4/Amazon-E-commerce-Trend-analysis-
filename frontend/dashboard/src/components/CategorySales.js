import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const CategorySales = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/category-sales')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading category sales…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No category sales data.</p>;

  return (
    <div>
      <h2>Category Sales</h2>
      <Plot
        data={[{
          x: data.map(d => d.Category),
          y: data.map(d => d.Amount),
          type: 'bar',
          marker: { color: 'teal' },
        }]}
        layout={{
          title: 'Sales by Category',
          xaxis: { title: 'Category' },
          yaxis: { title: 'Amount' },
          height: 350,
        }}
      />
    </div>
  );
};

export default CategorySales; 