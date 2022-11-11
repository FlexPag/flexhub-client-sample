import { Cart } from 'app/schemas';
import { Debt } from 'app/services';

export function createCart(debts: Debt[]) {
  const cart: Cart = {
    stage: 'debts-selected',
    debts,
  };

  sessionStorage.setItem('cart', JSON.stringify(cart));
  return cart;
}
