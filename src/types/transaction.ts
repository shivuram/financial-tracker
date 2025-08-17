export type TransactionData = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense"; // better to use union instead of string
};

export type TransactionType = "income" | "expense";
