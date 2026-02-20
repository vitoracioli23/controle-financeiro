const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const list = document.getElementById("list");
const balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateBalance() {
  const total = transactions.reduce((acc, item) => acc + item.amount, 0);
  balance.textContent = total.toFixed(2);
}

function render() {
  list.innerHTML = "";

  transactions.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.description} - R$ ${item.amount.toFixed(2)}
      <button onclick="removeTransaction(${index})">X</button>
    `;
    list.appendChild(li);
  });

  updateBalance();
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    description: description.value,
    amount: parseFloat(amount.value)
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();

  description.value = "";
  amount.value = "";
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateLocalStorage();
  render();
}

form.addEventListener("submit", addTransaction);

render();
