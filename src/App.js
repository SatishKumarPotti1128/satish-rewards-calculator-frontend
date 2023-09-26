import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [customerList, setCustomerList] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [showCustomerList, setShowCustomerList] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  useEffect(()=>{
    if(customerList){
    const custData = customerList.filter(item => item.id === customerId)
    if(custData.length !== 0)

    console.log(custData[0])
    setCustomerData(custData[0])
}
  }, [customerId, customerList, setCustomerId])

  useEffect(() => {
    console.log(customerList);
  }, [customerList]);

  useEffect(() => {
    console.log(customerData);
  }, [customerData]);

  function showCustomerTransactionsPage(custId) {
    setShowCustomerList(false)
    setCustomerId(custId)
  }

  function showCustomerListPage() {
    setShowCustomerList(true)
    setCustomerId(null)
  }


  function fetchCustomersList() {
    const apiUrl = "http://localhost:8080/customers";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCustomerList(data);
        setLoading(false);
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }


  return (
    <div className="container">
      <div className="navbar">
      {showCustomerList ?
        <h1>Customers Data</h1> 
        : 
      <>
      <button className="back-button" onClick={()=> showCustomerListPage()}>Back</button>
      <h1>Customer Transactions</h1>
      </>
        }
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        (!showCustomerList && customerId && customerData) ? 
        (
        // Customer Specific transactions
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Reward Points</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length !== 0 ? 
            customerData.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{Number(transaction.amount, 2)}</td>
                <td>{transaction.transactionDate}</td>
                <td>{Number(transaction.points,2)}</td>
                <td>{transaction.description}</td>
              </tr>
            )) : <></>}
          </tbody>
        </table>
        ) : 
        (
        // List of Customers
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Total Purchases</th>
              <th>Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr key={customer.id} onClick={() => showCustomerTransactionsPage(customer.id)}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{Number(customer.totalPurchases, 2)}</td>
                <td>{Number(customer.totalRewardPoints, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>)
      )}
    </div>
  );

}

export default App;