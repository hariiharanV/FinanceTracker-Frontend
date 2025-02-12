
const CurrencyDisplay = ({ amount }) => {
  // Format the number as currency (e.g., INR with commas)
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, 
  }).format(amount);

  return formattedAmount;
};

export default CurrencyDisplay;
