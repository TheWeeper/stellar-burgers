import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const loading = useSelector((state) => state.feed.loading);
  const error = useSelector((state) => state.feed.error);

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
    dispatch(fetchIngredients());
  };

  if (loading || !orders.length) return <Preloader />;
  if (error) console.error(error);
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
