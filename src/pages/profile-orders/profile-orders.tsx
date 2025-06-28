import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { fetchOrders } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const loading = useSelector((state) => state.feed.loading);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
