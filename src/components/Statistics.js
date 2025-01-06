import React from 'react';

const Statistics = ({ statistics, selectedMonth }) => (
  <div>
    <h3>Transactions Statistics - {selectedMonth}</h3>
    <div id="statistics">
      <div>Total Amount of Sales: <span id="totalSales">{statistics.totalSales}</span></div>
      <div>Total Sold Items: <span id="soldItems">{statistics.soldItems}</span></div>
      <div>Total Not Sold Items: <span id="notSoldItems">{statistics.notSoldItems}</span></div>
    </div>
  </div>
);

export default Statistics;
