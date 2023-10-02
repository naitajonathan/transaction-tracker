const transactionDisplay = document.querySelector("#transaction-display");
const filePath = "../data/data.json";
let transactionData = [];
const response = await JSON.parse(localStorage.getItem("transactions"));

window.onload = function () {
  loadData();
};
// fetch data from json file
const loadData = () => {
  // const response = await fetch(filePath);
  // const data = await response.json();
  // transactionData = await sortTransactions(data)
  transactionData = sortTransactions(response);
  displayTransactions();
};

//sorting data
const sortTransactions = (array) => {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
};

//converting date from iso to string
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return day + "th";
  } else {
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }
};

const dateToString = (date) => {
  const newDate = new Date(date);
  const dayOfWeek = daysOfWeek[newDate.getDay()];
  const month = months[newDate.getMonth()];
  const day = newDate.getDate();

  return `${dayOfWeek} ${addDaySuffix(day)} ${month}`;
};

//formatting amount to add commas
const amountToString = (amount) => {
  return Number(amount).toLocaleString();
};

const displayTransactions = async (data) => {
  // transactionData = await loadData();
  let transactionHtml = transactionData
    .map((transactionGroup) => {
      const { date, transactions } = transactionGroup;
      return `
                <div class="transaction-group">
                    <h2>${dateToString(date)}</h2>
                    <div class="transactions">
                    ${transactions
                      .map((transaction) => {
                        return `
                                <div class="transaction" id="${transaction.id}">
                                    <div class="transaction__header">
                                        <div class="badge">${
                                          transaction.category
                                        }</div>
                                        <div class="transaction__type transaction__type--${
                                          transaction.type
                                        }"></div>
                                    </div>
                                    <div class="transaction__body">
                                        <div class="transaction__name">${
                                          transaction.name
                                        }</div>
                                        <div class="transaction__amount">${amountToString(
                                          transaction.amount
                                        )}</div>
                                    </div>
                                </div>
                            `;
                      })
                      .join("")}
                    </div>
                </div>
            `;
    })
    .join("");
  transactionDisplay.innerHTML += transactionHtml;
};

//  FORM IMPLEMENTATION //
const transactionForm = document.getElementById("transaction-form");

transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //get form input values
  const name = cleanupValue(document.getElementById("transaction-name").value);
  const category = cleanupValue(
    document.getElementById("transaction-category").value
  );
  const amount = document.getElementById("transaction-amount").value;
  const date = document.getElementById("transaction-date").value;
  const type = category == "Income" ? "income" : "expense";
  const id = new Date().getTime();

  const transaction = { id, name, category, amount, type };

  //adding transaction to local data
  const index = transactionData.findIndex((item) => item.date === date);

  if (index !== -1) {
    transactionData[index].transactions.push(transaction);
  } else {
    transactionData.push({
      date,
      transactions: [transaction],
    });
  }

  console.log(transactionData);
  localStorage.setItem("transactions", JSON.stringify(transactionData));
  location.reload();
});

const cleanupValue = (value) => {
  const newValue = value.trim().toLowerCase();
  return newValue[0].toUpperCase() + newValue.substring(1);
};
