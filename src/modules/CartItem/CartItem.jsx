import { API_URL_RENDER } from '../../const';
import _ from './CartItem.module.scss';

export const CartItem = ({ name, price, photoUrl, quantity }) => (
  <li className={_.cart__item}>
    <img className={_.cart__img} src={API_URL_RENDER + photoUrl} alt={name} />
    <h4 className={_['cart__item-title']}>{name}</h4>
    <div className={_.cart__counter}>
      <button className={_['cart__counter-btn']}>-</button>
      <input
        className={_['cart__counter-input']}
        type='number'
        max='99'
        min='0'
        defaultValue={quantity}
      />
      <button className={_['cart__counter-btn']}>+</button>
    </div>
    <p className={_.cart__price}>{price}&nbsp;₽</p>
  </li>
);
