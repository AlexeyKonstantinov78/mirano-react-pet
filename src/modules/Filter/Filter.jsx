import _ from './Filter.module.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../store/goodsSlice';
import { getValidFilters } from '../../utils';


export const Filter = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    name: '',
  });

  const handleTypeChange = ({ target }) => {
    const { value, name } = target;
    const title = target.labels[0].textContent;

    const newFilters = { ...filters, [name]: value, name: title };

    setFilters(newFilters);
  }

  useEffect(() => {
    const validFilters = getValidFilters(filters);

    dispatch(fetchGoods(validFilters));
  }, [dispatch, filters]);


  return (
    <section className={_.filter}>
      <h2 className='visually-hidden'></h2>
      <div className='container'>
        <form className={_.filter__form}>
          <fieldset className={_.filter__group}>
            <input
              className={_.filter__radio}
              type='radio'
              name='type'
              value='bouquets'
              id='flower'
              checked={filters.type === 'bouquets'}
              onChange={handleTypeChange}
            />
            <label
              className={_.filter__label + ' ' + _.filter__label_flower}
              htmlFor='flower'>
              Цветы
            </label>

            <input
              className={_.filter__radio}
              type='radio'
              name='type'
              value='toys'
              id='toys'
              checked={filters.type === 'toys'}
              onChange={handleTypeChange}
            />
            <label
              className={_.filter__label + ' ' + _.filter__label_toys}
              htmlFor='toys'>
              Игрушки
            </label>

            <input
              className={_.filter__radio}
              type='radio'
              name='type'
              value='postcards'
              id='postcard'
              checked={filters.type === 'postcard'}
              onChange={handleTypeChange}
            />
            <label
              className={_.filter__label + ' ' + _.filter__label_postcard}
              htmlFor='postcard'>
              Открытки
            </label>
          </fieldset>

          <fieldset className={_.filter__group + ' ' + _.filter__group_choices}>
            <Choices
              btnLabel='Цена'
              type='prise'
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}>
              <div className={_.filter__choicesBox}>
                <fieldset className={_.filter__price}>
                  <input
                    className={_.filter__inputPrice}
                    type='text'
                    name='minPrice'
                    placeholder='от'
                  />
                  <input
                    className={_.filter__inputPrice}
                    type='text'
                    name='maxPrice'
                    placeholder='до'
                  />
                </fieldset>
              </div>
            </Choices>

            <Choices
              btnLabel='Тип товара'
              className={_.filter__choice_type}
              type='typeProduct'
              isOpen={openChoice === 1}
              onToggle={() => handleChoicesToggle(1)}>
              <div className={_.filter__choicesBox}>
                <ul className={_.filter__typeList}>
                  <li className={_.filter__typeItem}>
                    <button className={_.filter__typeButton} type='button'>
                      Монобукеты
                    </button>
                  </li>
                  <li className={_.filter__typeItem}>
                    <button className={_.filter__typeButton} type='button'>
                      Авторские букеты
                    </button>
                  </li>
                  <li className={_.filter__typeItem}>
                    <button className={_.filter__typeButton} type='button'>
                      Цветы в коробке
                    </button>
                  </li>
                  <li className={_.filter__typeItem}>
                    <button className={_.filter__typeButton} type='button'>
                      Цветы в корзине
                    </button>
                  </li>
                  <li className={_.filter__typeItem}>
                    <button className={_.filter__typeButton} type='button'>
                      Букеты из сухоцветов
                    </button>
                  </li>
                </ul>
              </div>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
