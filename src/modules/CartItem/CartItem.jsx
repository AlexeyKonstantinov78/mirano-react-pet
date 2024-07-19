import { useDispatch } from 'react-redux';
import { API_URL_RENDER } from '../../const';
import _ from './CartItem.module.scss';
import { useState } from 'react';
import { debounce } from '../../utils';
import { addItemToCart } from '../../store/thunks/addItemToCart';

export const CartItem = ({ id, name, price, photoUrl, quantity }) => {
  const dispatch = useDispatch();
  //const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }, 500);

  const handleInputChange = (e) => {
    const newQuantity = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : '';
    // setInputQuantity(newQuantity);
    debounceInputChange(newQuantity)
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    // setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    // setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <li className={_.cart__item}>
      <img className={_.cart__img} src={API_URL_RENDER + photoUrl} alt={name} />
      <h4 className={_['cart__item-title']}>{name}</h4>
      <div className={_.cart__counter}>
        <button className={_['cart__counter-btn']}
          onClick={handleDecrement}
        >-</button>
        <input
          className={_['cart__counter-input']}
          type='number'
          max='99'
          min='0'
          value={quantity}
          onChange={handleInputChange}
        />
        <button className={_['cart__counter-btn']}
          onClick={handleIncrement}
        >+</button>
      </div>
      <p className={_.cart__price}>{price * quantity}&nbsp;₽</p>
    </li>
  );
};
