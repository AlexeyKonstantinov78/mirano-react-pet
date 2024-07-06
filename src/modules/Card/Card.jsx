import { useDispatch } from 'react-redux';
import _ from './Card.module.scss';
import { addItemToCart } from '../../store/cartSlice';

export const Card = ({
  className = '',
  id,
  img,
  title,
  dateDelivery,
  price,
}) => {
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart({
      id,
      img,
      title,
      dateDelivery,
      price,
    }));
  };

  return (
    <article className={`${className} ${_.card}`}>
      <img className={_.card__image} src={img} alt={title} />
      <div className={_.card__content}>
        <h3 className={_.card__title}>{title}</h3>
        <div className={_.card__footer}>
          <p className={_.card__dateDelivery}>{dateDelivery}</p>
          <button className={_.card__button} onClick={handlerAddToCart}>{price}&nbsp;₽</button>
        </div>
      </div>
    </article>
  );
};
