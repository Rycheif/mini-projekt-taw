export interface IBasket {
  productId: string;
  quantity: number;
}

export interface AddProductToBasketRequest {
  userId: string;
  productId: string;
  quantity: number;
}
