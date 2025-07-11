// src/components/CustomerClusters.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const CustomerClusters = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customer-clusters')
      .then(res => {
        console.log("✅ Data from backend:", res.data);
        setData(res.data);
      })
      .catch(err => console.error("❌ Failed to fetch cluster data", err));
  }, []);

  if (data === null) {
    return <p>Loading clusters…</p>;
  }
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No cluster data returned.</p>;
  }

  const clusters = [...new Set(data.map(d => d.Cluster))];
  const traces = clusters.map(cluster => {
    const points = data.filter(d => d.Cluster === cluster);
    return {
      x: points.map(p => p.Amount),
      y: points.map(p => p.Qty),
      text: points.map(p => `${p['ship-city']}, ${p['ship-state']}`),
      mode: 'markers',
      type: 'scatter',
      name: `Cluster ${cluster}`,
      marker: { size: 10 }
    };
  });

  return (
    <div>
      <h2>Customer Segments (K‑Means)</h2>
      <p className="section-desc">Customer clusters based on amount spent and quantity ordered.</p>
      <Plot
        data={traces}
        layout={{
          title: 'Clusters of Customers by Amount & Quantity',
          xaxis: { title: 'Amount Spent' },
          yaxis: { title: 'Quantity Ordered' },
          height: 500,
          width: 900
        }}
      />
    </div>
  );
};

export default CustomerClusters;
