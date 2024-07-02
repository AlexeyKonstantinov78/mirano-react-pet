import _ from './Goods.module.scss';
import { goodsArray } from '../../goodsArray';
import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';

export const Goods = () => (
  <section className={_.goods}>
    <div className={`container ${_.goods__container}`}>
      <div className={_.goods__box}>
        <h2 className={_.goods__title}>Цветы</h2>

        <ul className={_.goods__list}>
          {goodsArray.map((item) => (
            <li key={item.id} className={_.goods__item}>
              <Card className={_.goods__card} {...item} />
            </li>
          ))}
        </ul>
      </div>

      <Cart />
    </div>
  </section>
);

