export const CartItem = ({ _, img, title, price }) => (
  <li className={_.cart__item}>
    <img className={_.cart__img}
      src={img}
      alt={title} />
    <h4 className={_.cart__itemTitle}>{title}</h4>
    <div className={_.cart__counter}><button
      className={_.cart__counterBtn}>-</button><input
        className={_.cart__counterInput} type="number" max="99" min="0"
        value="1" /><button className={_.cart__counterBtn}>+</button></div>
    <p className={_.cart__price}>{price}&nbsp;₽</p>
  </li>
);