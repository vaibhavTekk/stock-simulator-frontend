const dummyStocks = [
  { name: "Apple Inc.", symbol: "AAPL" },
  { name: "Microsoft Corp.", symbol: "MSFT" },
  { name: "Amazon.com Inc.", symbol: "AMZN" },
  { name: "Google LLC", symbol: "GOOGL" },
  { name: "Facebook Inc.", symbol: "FB" },
];

const dummyStockDetails = {
  AAPL: [
    { date: "2024-06-20", open: 150, high: 152, low: 149, close: 151, volume: 1000000 },
    { date: "2024-06-21", open: 151, high: 153, low: 150, close: 152, volume: 1200000 },
    { date: "2024-06-22", open: 152, high: 154, low: 151, close: 153, volume: 1100000 },
  ],
  MSFT: [
    { date: "2024-06-20", open: 280, high: 285, low: 279, close: 282, volume: 800000 },
    { date: "2024-06-21", open: 282, high: 284, low: 280, close: 283, volume: 900000 },
    { date: "2024-06-22", open: 283, high: 286, low: 281, close: 285, volume: 850000 },
  ],
  AMZN: [
    { date: "2024-06-20", open: 3300, high: 3320, low: 3290, close: 3310, volume: 500000 },
    { date: "2024-06-21", open: 3310, high: 3330, low: 3300, close: 3320, volume: 600000 },
    { date: "2024-06-22", open: 3320, high: 3340, low: 3310, close: 3330, volume: 550000 },
  ],
  GOOGL: [
    { date: "2024-06-20", open: 2800, high: 2830, low: 2790, close: 2810, volume: 700000 },
    { date: "2024-06-21", open: 2810, high: 2820, low: 2800, close: 2815, volume: 750000 },
    { date: "2024-06-22", open: 2815, high: 2840, low: 2805, close: 2830, volume: 720000 },
  ],
  FB: [
    { date: "2024-06-20", open: 340, high: 345, low: 338, close: 343, volume: 400000 },
    { date: "2024-06-21", open: 343, high: 347, low: 341, close: 345, volume: 420000 },
    { date: "2024-06-22", open: 345, high: 348, low: 342, close: 347, volume: 410000 },
  ],
};

function renderStocks(stocks) {
  const stocksUl = document.getElementById("stocks");
  stocksUl.innerHTML = "";
  stocks.forEach((stock) => {
    const li = document.createElement("li");
    li.textContent = stock.symbol;
    li.onclick = () => showStockDetails(stock.symbol);
    stocksUl.appendChild(li);
  });
}

function renderStockDetails(details) {
  const tbody = document.getElementById("stock-details").querySelector("tbody");
  tbody.innerHTML = "";
  details.forEach((detail) => {
    const tr = document.createElement("tr");
    Object.keys(detail).forEach((key) => {
      const td = document.createElement("td");
      td.textContent = detail[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function showStockDetails(stockSymbol) {
  const details = dummyStockDetails[stockSymbol];
  renderStockDetails(details);
}

function searchStocks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredStocks = dummyStocks.filter(
    (stock) => stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query)
  );
  renderStocks(filteredStocks);
}

function init() {
  renderStocks(dummyStocks);
}

init();
