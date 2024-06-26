const apiUrl = "http://localhost:8080/stocks"; // Replace with your actual API URL

async function fetchStockSymbols() {
  return fetch(apiUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resp = await response.json();
      return resp;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return []; // Return empty array on error
    });
}

function fetchStockDetails(symbol) {
  const url = `${apiUrl}/${symbol}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.prices) // Assuming the API returns an array of prices
    .catch((error) => {
      console.error(`Error fetching details for ${symbol}:`, error);
      return []; // Return empty array on error
    });
}

function renderStocks(stocks) {
  const stocksUl = document.getElementById("stocks");
  stocksUl.innerHTML = "";
  stocks.forEach((stock) => {
    const li = document.createElement("li");
    li.textContent = stock;
    li.onclick = () => showStockDetails(stock);
    stocksUl.appendChild(li);
  });
}

function renderStockDetails(details) {
  const tbody = document.getElementById("stock-details").querySelector("tbody");
  tbody.innerHTML = "";
  details.forEach((detail) => {
    const tr = document.createElement("tr");
    const dateTd = document.createElement("td");
    dateTd.textContent = detail.date;
    tr.appendChild(dateTd);
    const priceTd = document.createElement("td");
    priceTd.textContent = detail.price;
    tr.appendChild(priceTd);
    const volumeTd = document.createElement("td");
    volumeTd.textContent = detail.volume;
    tr.appendChild(volumeTd);
    tbody.appendChild(tr);
  });
}

function showStockDetails(stockSymbol) {
  fetchStockDetails(stockSymbol)
    .then((details) => renderStockDetails(details))
    .catch((error) => console.error(`Error fetching details for ${stockSymbol}:`, error));
}

function searchStocks() {
  const query = document.getElementById("search").value.toLowerCase();
  fetchStockSymbols().then((stocks) => {
    const filteredStocks = stocks.filter((stock) => stock.toLowerCase().includes(query));
    renderStocks(filteredStocks);
  });
}

function init() {
  fetchStockSymbols()
    .then((stocks) => renderStocks(stocks))
    .catch((error) => console.error("Error initializing application:", error));
}

init();
