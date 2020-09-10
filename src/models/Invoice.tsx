export interface Invoice {
  date: Date;
  status: string;
  type: string;
  item: [Item];
  total: number;
}

interface Item {
  description: string;
  priceHT: number;
}
