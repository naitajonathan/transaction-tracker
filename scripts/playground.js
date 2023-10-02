const transactionData = [
  {
    date: "2023-08-17",
    transactions: [
      {
        name: "Dinner Pizza",
        amount: "28000",
        type: "expense",
        catergory: "Home",
      },
      {
        name: "Salary ATRO E&M",
        amount: "2000000",
        type: "income",
        catergory: "Income",
      },
      {
        name: "Lunch",
        amount: "5000",
        type: "expense",
        catergory: "Lunch",
      },
    ],
  },
  {
    date: "2023-08-16",
    transactions: [
      {
        name: "Boda",
        amount: "2000",
        type: "expense",
        catergory: "Transport",
      },
      {
        name: "Shoe repair",
        amount: "2000",
        type: "expense",
        catergory: "Miscellaneous",
      },
      {
        name: "Lunch",
        amount: "5000",
        type: "expense",
        catergory: "Lunch",
      },
    ],
  },
  {
    date: "2023-08-15",
    transactions: [
      {
        name: "Internet",
        amount: "224000",
        type: "expense",
        catergory: "Home",
      },
      {
        name: "Lunch",
        amount: "5000",
        type: "expense",
        catergory: "Lunch",
      },
    ],
  },
];

const date = "2023-08-25";
const transaction = {
  name: "Office shoes",
  category: "Home",
  amount: "30904",
  type: "Expense",
};

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

console.log(localStorage.getItem("transactions"));
