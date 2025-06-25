import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsError } = useSelector(
    (state) => state.ingredients
  );
  const { id } = useParams<{ id: string }>();
  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients]
  );

  useEffect(() => {
    if (!ingredientsRequest && !ingredientsError && ingredients.length === 0)
      dispatch(fetchIngredients());
  }, [dispatch, ingredients.length, ingredientsRequest, ingredientsError, id]);

  if (ingredientsRequest && !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
