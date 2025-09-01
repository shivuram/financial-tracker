export type TransactionData = {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
};

export type TransactionType = "income" | "expense";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number | null;
};
