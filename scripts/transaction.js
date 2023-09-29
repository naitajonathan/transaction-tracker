const transactionDisplay = document.querySelector("#transaction-display");
console.log(transactionDisplay);

// fetch data from json file
const loadData = async () => {
  const response = await fetch("../data/data.json");
  const data = await response.json();
  return data;
};

const displayTransactions = async () => {
  const transactionData = await loadData();
  let transactionHtml = await transactionData
    .map((transactionGroup) => {
      const { date, transactions } = transactionGroup;
      console.log(date, transactions);
      return `
                <div class="transaction-group">
                    <h2>${date}</h2>
                    <div class="transactions">
                    ${transactions
                      .map((transaction) => {
                        return `
                                <div class="transaction">
                                    <div class="transaction__header">
                                        <div class="badge">${transaction.catergory}</div>
                                        <div class="transaction__type transaction__type--${transaction.type}"></div>
                                    </div>
                                    <div class="transaction__body">
                                        <div class="transaction__name">${transaction.name}</div>
                                        <div class="transaction__amount">${transaction.amount}</div>
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

displayTransactions();
