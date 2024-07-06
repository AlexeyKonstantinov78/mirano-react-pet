import _ from './Goods.module.scss';

import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '../../store/goodsSlice';
import { API_URL_RENDER } from '../../const';

export const Goods = () => {
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error } = useSelector(state => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods('/api/products'));
    }
  }, [goodsStatus, dispatch]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Loading</p>
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className={_.goods}>
      <div className={`container ${_.goods__container}`}>
        <div className={_.goods__box}>
          <h2 className={_.goods__title}>Цветы</h2>
          {content}

          <ul className={_.goods__list}>
            {goods.map((item) => (
              <li key={item.id} className={_.goods__item}>
                <Card className={_.goods__card}
                  id={item.id}
                  img={API_URL_RENDER + item.photoUrl}
                  title={item.name}
                  dateDelivery="сегодня в 14:00"
                  price={item.price}
                />
              </li>
            ))}
          </ul>
        </div>

        <Cart />
      </div>
    </section>
  );
};
