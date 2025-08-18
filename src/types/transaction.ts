export type TransactionData = {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
};

export type TransactionType = "income" | "expense";
