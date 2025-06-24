import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
