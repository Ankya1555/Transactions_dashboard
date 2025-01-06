import React from 'react';

const TransactionsTable = ({ transactions }) => (
  <table id="transactionTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        <th>Sold</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.id}</td>
          <td>{transaction.title}</td>
          <td>{transaction.description}</td>
          <td>{transaction.price}</td>
          <td>{transaction.category}</td>
          <td>{transaction.sold ? 'Yes' : 'No'}</td>
          <td><img src={transaction.img} alt={transaction.title} style={{ width: '50px', height: '50px' }} /></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionsTable;
