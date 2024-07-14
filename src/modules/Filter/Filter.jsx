import _ from './Filter.module.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../store/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { setFiltersSlice } from '../../store/filterSlice';
import { FilterRadio } from './FilterRadio/FilterRadio';

const filterTypes = [
  { value: 'bouquets', title: 'Цветы' },
  { value: 'toys', title: 'Игрушки' },
  { value: 'postcards', title: 'Открытки' },
];

export const Filter = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);
  const filters = useSelector(state => state.filter);
  const prevFiltersRef = useRef(filters);
  const debounceFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300)).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);
    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(validFilters));
    } else {
      debounceFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, debounceFetchGoods, filters]);

  //handle
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const { value, name } = target;
    const title = target.labels[0].textContent;
    const newFilters = {
      ...filters, [name]: value, name: title, minPrice: '', maxPrice: ''
    };
    dispatch(setFiltersSlice(newFilters));
    setOpenChoice(-1);
  }

  const handlePriceChange = ({ target }) => {
    const { value, name } = target;
    const title = `Фильтр по цене`;

    const newFilters = { ...filters, [name]: !isNaN(parseInt(value)) ? value : '', name: title };
    if (newFilters.type) {
      dispatch(setFiltersSlice(newFilters));
    }
  }

  return (
    <section className={_.filter}>
      <h2 className='visually-hidden'></h2>
      <div className='container'>
        <form className={_.filter__form}>
          <fieldset className={_.filter__group}>
            {filterTypes.map((item) => (
              <FilterRadio
                key={item.value}
                handleTypeChange={handleTypeChange}
                data={item}
                _={_}
              />
            ))}
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
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                  />
                  <input
                    className={_.filter__inputPrice}
                    type='text'
                    name='maxPrice'
                    placeholder='до'
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
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
