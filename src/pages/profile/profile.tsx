import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';
export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user)
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
  }, [user]);

  if (!user) return null;

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    formValue.password !== '';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(formValue)).unwrap();
      setFormValue((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      console.error('Ошибка обновления профиля:', err);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
