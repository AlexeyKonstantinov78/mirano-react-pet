import _f from './Filter.module.scss';
import _c from './Choices.module.scss';

export const Filter = () => (
  <section className={_f.filter}>
    <h2 className="visually-hidden"></h2>
    <div className="container">
      <form className={_f.filter__form}>
        <fieldset className={_f.filter__group}>
          <input className={_f.filter__radio} type="radio" name="type"
            value="bouquets" id="flower"
            defaultChecked />
          <label className={_f.filter__label + ' ' + _f.filter__label_flower}
            htmlFor="flower">Цветы</label>

          <input className={_f.filter__radio} type="radio" name="type" value="toys"
            id="toys" />
          <label className={_f.filter__label + ' ' + _f.filter__label_toys}
            htmlFor="toys">Игрушки</label>

          <input className={_f.filter__radio} type="radio" name="type"
            value="postcards" id="postcard" />
          <label className={_f.filter__label + ' ' + _f.filter__label_postcard}
            htmlFor="postcard">Открытки</label>
        </fieldset>

        <fieldset className={_f.filter__group + ' ' + _f.filter__group_choices}>
          <div className={_f.filter__choices + ' ' + _c.choices}>
            <button className={_f.filter__select + ' ' + _c.choices__btn}
              type="button">Цена</button>

            <div className={_c.choices__box + ' ' + _f.filter__choicesBox}>
              <fieldset className={_f.filter__price}>
                <input className={_f.filter__inputPrice} type="text" name="minPrice"
                  placeholder="от" />
                <input className={_f.filter__inputPrice} type="text" name="maxPrice"
                  placeholder="до" />
              </fieldset>
            </div>
          </div>

          <div className={_f.filter__choices + ' ' + _f.filter__choices_type + ' ' + _c.choices}>
            <button className={_f.filter__select + ' ' + _c.choices__btn} type="button">Тип
              товара</button>

            <div
              className={_c.choices__box + ' ' + _f.filter__choicesBox + ' ' + _f.filter__choicesBox_type}>
              <ul className={_f.filter__typeList}>
                <li className={_f.filter__typeItem}>
                  <button className={_c.filter__typeButton}
                    type="button">Монобукеты</button>
                </li>
                <li className={_f.filter__typeItem}>
                  <button className={_c.filter__typeButton} type="button">Авторские
                    букеты</button>
                </li>
                <li className={_f.filter__typeItem}>
                  <button className={_c.filter__typeButton} type="button">Цветы в
                    коробке</button>
                </li>
                <li className={_f.filter__typeItem}>
                  <button className={_c.filter__typeButton} type="button">Цветы в
                    корзине</button>
                </li>
                <li className={_f.filter__typeItem}>
                  <button className={_c.filter__typeButton} type="button">Букеты из
                    сухоцветов</button>
                </li>
              </ul>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
);