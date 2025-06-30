import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { UnauthRoute } from '../unauth-route/unauth-route';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { fetchUser, setAuthChecked } from '../../services/slices/user';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) dispatch(fetchUser());
    else dispatch(setAuthChecked(true));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<Feed />} />
        <Route
          path='/login'
          element={
            <UnauthRoute>
              <Login />
            </UnauthRoute>
          }
        />
        <Route
          path='/register'
          element={
            <UnauthRoute>
              <Register />
            </UnauthRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <UnauthRoute>
              <ForgotPassword />
            </UnauthRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UnauthRoute>
              <ResetPassword />
            </UnauthRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Информация об ингредиенте'
                onClose={() => navigate('/')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Информация о заказе'
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
