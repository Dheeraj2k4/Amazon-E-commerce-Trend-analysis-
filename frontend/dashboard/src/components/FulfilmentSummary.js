import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FulfilmentSummary.css';

const FulfilmentSummary = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fulfilment-summary')
      .then(res => setData(res.data))
      .catch(() => setData({}));
  }, []);

  if (data === null) return <p>Loading fulfilment summary…</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No fulfilment summary data.</p>;

  return (
    <div className="fulfilment-summary">
      <h2>Fulfilment Summary</h2>
      <div className="summary-cards">
        {data.map((item) => (
          <div className="summary-card" key={item.Fulfilment}>
            <h3>{item.Fulfilment}</h3>
            <p>Qty: {item.Qty.toLocaleString()}</p>
            <p>Amount: ₹{item.Amount.toLocaleString(undefined, {maximumFractionDigits:2})}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FulfilmentSummary; 