import React from 'react';
import './App.css';
import Header from './components/Header';
import CustomerClusters from './components/CustomerClusters';
import CourierStatus from './components/CourierStatus';
import DailySales from './components/DailySales';
import StateSales from './components/StateSales';
import FulfilmentSummary from './components/FulfilmentSummary';
import TopCategories from './components/TopCategories';
import SalesTrends from './components/SalesTrends';

function App() {
  return (
    <div className="App">
      <Header />
      <FulfilmentSummary />
      <section><TopCategories /></section>
      <section style={{margin: '2.5rem 0'}}><SalesTrends /></section>
      <hr className="dashboard-divider" />
      <div className="dashboard-grid">
        <section>
          <CourierStatus />
          <p className="section-desc">Distribution of orders by courier status.</p>
        </section>
        <section>
          <DailySales />
          <p className="section-desc">Track sales trends over time.</p>
        </section>
        <section>
          <StateSales />
          <p className="section-desc">Sales performance by state.</p>
        </section>
        <section style={{gridColumn: '1 / -1'}}>
          <CustomerClusters />
          <p className="section-desc">Customer segments based on purchase behavior.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
