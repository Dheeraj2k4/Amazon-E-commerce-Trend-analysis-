import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const CourierStatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courier-status')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading courier status…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No courier status data.</p>;

  return (
    <div>
      <h2>Courier Status</h2>
      <Plot
        data={[{
          values: data.map(d => d.Count),
          labels: data.map(d => d["Courier Status"]),
          type: 'pie',
          hole: 0.4,
        }]}
        layout={{
          title: 'Courier Status Distribution',
          height: 350,
        }}
      />
    </div>
  );
};

export default CourierStatus; 