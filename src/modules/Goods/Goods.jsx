import _ from './Goods.module.scss';
import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { API_URL_RENDER } from '../../const';

export const Goods = () => {

  const {
    items: goods,
    name,
    content
  } = useSelector(state => state.goods);

  return (
    <section className={_.goods}>
      <div className={`container ${_.goods__container}`}>
        <div className={_.goods__box}>
          <h2 className={_.goods__title}>{name}</h2>
          {content && (<center>{content}</center>)}

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
