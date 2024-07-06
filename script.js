// API base URL
const apiUrl = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function () {
  const stockList = document.getElementById("stockList");
  const stockDetails = document.getElementById("stockDetails").getElementsByTagName("tbody")[0];
  const search = document.getElementById("search");
  const transactionForm = document.getElementById("transactionForm");
  const balance = document.getElementById("balance");
  const currentStocks = document.getElementById("currentStocks");

  let stocks = [];

  function fetchStocks() {
    fetch(`${apiUrl}/stocks`)
      .then((response) => response.json())
      .then((data) => {
        stocks = data;
        renderStockList(stocks);
      });
  }

  function fetchUser() {
    fetch(`${apiUrl}/stocks/user`)
      .then((response) => response.json())
      .then((user) => {
        balance.innerText = user.balance.toFixed(2);
      });
  }

  function fetchUserStocks() {
    fetch(`${apiUrl}/stocks/user/stocks`)
      .then((response) => response.json())
      .then((userStocks) => {
        renderUserStocks(userStocks);
      });
  }

  fetchStocks();
  fetchUser();
  fetchUserStocks();

  search.addEventListener("input", function () {
    const searchTerm = search.value.toLowerCase();
    const filteredStocks = stocks.filter((stock) => stock.toLowerCase().includes(searchTerm));
    renderStockList(filteredStocks);
  });

  stockList.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "LI") {
      const symbol = e.target.innerText;
      fetch(`${apiUrl}/stocks/${symbol}`)
        .then((response) => response.json())
        .then((stock) => {
          renderStockDetails(stock);
        });
    }
  });

  transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const symbol = document.getElementById("symbol").value;
    const quantity = document.getElementById("quantity").value;
    const action = document.getElementById("action").value;

    fetch(`${apiUrl}/stocks/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `symbol=${symbol}&quantity=${quantity}`,
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message);
        fetchUser();
        fetchUserStocks();
        fetchStocks();
      });
  });

  function renderStockList(stocks) {
    stockList.innerHTML = "";
    stocks.forEach((stock) => {
      const li = document.createElement("li");
      li.innerText = stock;
      stockList.appendChild(li);
    });
  }

  function renderStockDetails(stock) {
    stockDetails.innerHTML = "";
    stock.prices.forEach((priceEntry) => {
      const row = stockDetails.insertRow();
      const dateCell = row.insertCell(0);
      const priceCell = row.insertCell(1);
      const volumeCell = row.insertCell(2);

      dateCell.innerText = priceEntry.date;
      priceCell.innerText = priceEntry.price;
      volumeCell.innerText = priceEntry.volume;
    });
  }

  function renderUserStocks(userStocks) {
    currentStocks.innerHTML = "";
    Object.entries(userStocks).forEach(([symbol, quantity]) => {
      const li = document.createElement("li");
      li.innerText = `${symbol}: ${quantity} shares`;
      currentStocks.appendChild(li);
    });
  }
});
