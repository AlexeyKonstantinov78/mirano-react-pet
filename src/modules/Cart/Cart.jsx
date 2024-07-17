import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../CartItem/CartItem';
import _ from './Cart.module.scss';
import { toggleCart } from '../../store/cartSlice';
import { openModal } from '../../store/orderSlice';
import { useEffect, useRef } from 'react';

export const Cart = () => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector((state) => state.cart.isOpen);
  const items = useSelector((state) => state.cart.items);
  const cartTotalPrice = useSelector((state) => state.cart.totalCartPrice);

  const cartRef = useRef(null);

  useEffect(() => {
    if (isOpenCart) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpenCart]);

  const handlerCloseCart = () => {
    dispatch(toggleCart());
  };

  const handlerOpenOrder = () => {
    dispatch(openModal());
  };

  return (
    isOpenCart && (
      <section className={_.cart + ' ' + _.cart_open} ref={cartRef}>
        <div className={_.cart__container}>
          <div className={_.cart__header}>
            <h3 className={_.cart__title}>Ваш заказ</h3>

            <button className={_.cart__close} onClick={handlerCloseCart}>
              <svg
                width='28'
                height='28'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <rect
                  x='5'
                  y='5.70715'
                  width='1'
                  height='25'
                  transform='rotate(-45 5 5.70715)'
                  fill='#D17D2F'
                />
                <rect
                  x='22.6777'
                  y='5'
                  width='1'
                  height='25'
                  transform='rotate(45 22.6777 5)'
                  fill='#D17D2F'
                />
              </svg>
            </button>
          </div>

          <p className={_.cart__dateDelivery}>сегодня в 14:00</p>

          <ul className={_.cart__list}>
            {items.map((item) => (
              <CartItem key={item.id} _={_} {...item} />
            ))}
          </ul>

          <div className={_.cart__footer}>
            <button className={_.cart__orderBtn} onClick={handlerOpenOrder} disabled={!items.length}>
              Оформить
            </button>
            <p className={_.cart__price + ' ' + _.cart__price_total}>
              {cartTotalPrice}&nbsp;₽
            </p>
          </div>
        </div>
      </section>
    )
  );
};
