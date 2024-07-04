import _ from './Filter.module.scss';
import { Choices } from '../Choices/Choices';

export const Filter = () => (
  <section className={_.filter}>
    <h2 className="visually-hidden"></h2>
    <div className="container">
      <form className={_.filter__form}>
        <fieldset className={_.filter__group}>
          <input className={_.filter__radio} type="radio" name="type"
            value="bouquets" id="flower"
            defaultChecked />
          <label className={_.filter__label + ' ' + _.filter__label_flower}
            htmlFor="flower">Цветы</label>

          <input className={_.filter__radio} type="radio" name="type" value="toys"
            id="toys" />
          <label className={_.filter__label + ' ' + _.filter__label_toys}
            htmlFor="toys">Игрушки</label>

          <input className={_.filter__radio} type="radio" name="type"
            value="postcards" id="postcard" />
          <label className={_.filter__label + ' ' + _.filter__label_postcard}
            htmlFor="postcard">Открытки</label>
        </fieldset>

        <fieldset className={_.filter__group + ' ' + _.filter__group_choices}>
          <Choices btnLabel="Цена">
            <fieldset className={_.filter__price}>
              <input className={_.filter__inputPrice} type="text" name="minPrice"
                placeholder="от" />
              <input className={_.filter__inputPrice} type="text" name="maxPrice"
                placeholder="до" />
            </fieldset>
          </Choices>

          <Choices btnLabel="Тип товара" className={_.filter__choice_type}>
            <ul className={_.filter__typeList}>
              <li className={_.filter__typeItem}>
                <button className={_.filter__typeButton}
                  type="button">Монобукеты</button>
              </li>
              <li className={_.filter__typeItem}>
                <button className={_.filter__typeButton} type="button">Авторские
                  букеты</button>
              </li>
              <li className={_.filter__typeItem}>
                <button className={_.filter__typeButton} type="button">Цветы в
                  коробке</button>
              </li>
              <li className={_.filter__typeItem}>
                <button className={_.filter__typeButton} type="button">Цветы в
                  корзине</button>
              </li>
              <li className={_.filter__typeItem}>
                <button className={_.filter__typeButton} type="button">Букеты из
                  сухоцветов</button>
              </li>
            </ul>
          </Choices>
        </fieldset>
      </form>
    </div>
  </section>
);