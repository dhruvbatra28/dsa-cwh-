document.addEventListener("DOMContentLoaded", () => {
  const stockData = []; // Holds stock items
  const billingData = []; // Holds billing items

  const stockTable = document.querySelector("#stock-table tbody");
  const billingTable = document.querySelector("#billing-table tbody");

  // Add Stock
  document.getElementById("add-stock-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const itemId = `stock-${Date.now()}`; // Unique ID for stock item
    const itemName = document.getElementById("item-name").value;
    const itemQuantity = parseInt(document.getElementById("item-quantity").value, 10);

    // Check if item already exists in stock
    const existingItem = stockData.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += itemQuantity;
    } else {
      stockData.push({ id: itemId, name: itemName, quantity: itemQuantity });
    }
    renderStockTable();
    e.target.reset();
  });

  // Render Stock Table
  function renderStockTable() {
    stockTable.innerHTML = "";
    stockData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
      `;
      stockTable.appendChild(row);
    });
  }

  // Add to Billing
  document.getElementById("billing-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const billId = `bill-${Date.now()}`; // Unique ID for billing entry
    const partyName = document.getElementById("party-name").value;
    const itemName = document.getElementById("billing-item-name").value;
    const itemQuantity = parseInt(document.getElementById("billing-quantity").value, 10);

    // Check if item exists in stock
    const stockItem = stockData.find((item) => item.name === itemName);
    if (!stockItem || stockItem.quantity < itemQuantity) {
      alert("Insufficient stock or item not found!");
      return;
    }

    // Deduct quantity from stock
    stockItem.quantity -= itemQuantity;
    renderStockTable();

    // Add to billing
    billingData.push({ id: billId, party: partyName, item: itemName, quantity: itemQuantity });
    renderBillingTable();
    e.target.reset();
  });

  // Render Billing Table
  function renderBillingTable() {
    billingTable.innerHTML = "";
    billingData.forEach((bill, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${bill.id}</td>
        <td>${bill.party}</td>
        <td>${bill.item}</td>
        <td>${bill.quantity}</td>
        <td><button data-index="${index}" class="delete-bill-btn">Delete</button></td>
      `;
      billingTable.appendChild(row);
    });
  }

  // Handle Delete from Billing
  billingTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-bill-btn")) {
      const index = e.target.dataset.index;
      const deletedItem = billingData[index];

      // Restore stock quantity when bill item is deleted
      const stockItem = stockData.find((item) => item.name === deletedItem.item);
      if (stockItem) {
        stockItem.quantity += deletedItem.quantity;
      }

      // Remove from billing
      billingData.splice(index, 1);
      renderBillingTable();
      renderStockTable();
    }
  });

  // Print Bill
  document.getElementById("print-bill").addEventListener("click", () => {
    const billWindow = window.open("", "Print Bill", "width=800,height=600");
    billWindow.document.write("<h1>Bill Details</h1>");
    billWindow.document.write("<table border='1' style='width: 100%;'>");
    billWindow.document.write(`
      <thead>
        <tr>
          <th>Bill ID</th>
          <th>Party Name</th>
          <th>Item Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
    `);
    billWindow.document.write("<tbody>");
    billingData.forEach((bill) => {
      billWindow.document.write(`
        <tr>
          <td>${bill.id}</td>
          <td>${bill.party}</td>
          <td>${bill.item}</td>
          <td>${bill.quantity}</td>
        </tr>
      `);
    });
    billWindow.document.write("</tbody></table>");
    billWindow.print();
  });
});
