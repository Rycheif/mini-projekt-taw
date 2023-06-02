export interface IProduct {
  id?: string;
  manufacturer: string;
  name: string;
  image: string;
  price: number;
  currency?: string;
  quantity: number;
}

export interface IProductPage {
  result: IProduct[],
  totalPages: number;
  currentPage: number;
}
