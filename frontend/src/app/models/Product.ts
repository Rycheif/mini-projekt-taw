export interface IProduct {
  _id?: string;
  manufacturer: string;
  name: string;
  image: string;
  price: number;
  currency?: string;
  quantity: number;
  description: string;
}

export interface IProductPage {
  count: number;
  result: IProduct[],
  totalPages: number;
  currentPage: number;
}
