// types/index.ts
export interface Transaction {
    _id?: string;
    description: string;
    amount: number | string;
    date: string;
    category?: string;

  }
  
  export interface Budget {
    amount: number;
    category: string;
    month: string;
  }