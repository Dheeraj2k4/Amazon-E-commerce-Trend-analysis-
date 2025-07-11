import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const ClusterDistribution = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customer-clusters')
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) return <p>Loading cluster distribution…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No cluster data.</p>;

  // Count customers per cluster
  const clusterCounts = data.reduce((acc, cur) => {
    acc[cur.Cluster] = (acc[cur.Cluster] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2>Customer Cluster Distribution</h2>
      <p className="section-desc">Proportion of customers in each segment (K-Means clusters).</p>
      <Plot
        data={[{
          values: Object.values(clusterCounts),
          labels: Object.keys(clusterCounts).map(c => `Cluster ${c}`),
          type: 'pie',
          hole: 0.4,
        }]}
        layout={{
          title: '',
          height: 350,
        }}
      />
    </div>
  );
};

export default ClusterDistribution; 