import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './components/fakeApi';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import TransactionsChart from './components/TransactionsChart';
import './styles.css';

const App = () => {
  const [month, setMonth] = useState('03'); // Default to March
  const [searchText, setSearchText] = useState('');
  const [allTransactions, setAllTransactions] = useState([]); // Stores all transactions
  const [displayTransactions, setDisplayTransactions] = useState([]); // Transactions for the current page
  const [statistics, setStatistics] = useState({});
  const [chartData, setChartData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Fetch all transactions when month or searchText changes
  useEffect(() => {
    fetchTransactions(month, searchText)
      .then(data => {
        setAllTransactions(data.transactions || []);
        setStatistics(data.statistics || {});
        setChartData(data.chartData || {});
        setError(null); // Reset error state on successful fetch

        // Set up pagination
        const totalEntries = data.transactions.length || 0;
        setTotalPages(Math.ceil(totalEntries / itemsPerPage));
        setCurrentPage(1); // Reset to the first page
      })
      .catch(err => {
        console.error('Error fetching transactions:', err);
        setError('Failed to load data. Please try again.');
      });
  }, [month, searchText]);

  // Update transactions for the current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayTransactions(allTransactions.slice(startIndex, endIndex));
  }, [allTransactions, currentPage]);

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const selectedMonthName = monthNames[parseInt(month, 10) - 1];

  return (
    <div className="container">
      <div className="header">
        <div className="circle">Transaction Dashboard</div>
      </div>
      <div className="controls">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search transactions..."
          className="search-input"
          aria-label="Search transactions"
        />
        <select
          value={month}
          onChange={handleMonthChange}
          className="month-dropdown"
          aria-label="Select month"
        >
          {monthNames.map((name, index) => (
            <option key={index} value={String(index + 1).padStart(2, '0')}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {/* Display error message if fetching fails */}
      {error && <div className="error-message">{error}</div>}

      {/* Transactions Table */}
      <TransactionsTable transactions={displayTransactions} />

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {/* Statistics Section */}
      <div className="statistics-card">
        <Statistics statistics={statistics} selectedMonth={selectedMonthName} />
      </div>

      {/* Chart Section */}
      <div className="chart-card">
        <TransactionsChart chartData={chartData} selectedMonth={selectedMonthName} />
      </div>
    </div>
  );
};

export default App;
