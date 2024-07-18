import _ from './Filter.module.scss';
import { Choices } from '../Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../store/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { changeCategory, changePrice, changeType } from '../../store/filtersSlice';
import { FilterRadio } from './FilterRadio/FilterRadio';

const filterTypes = [
  { value: 'bouquets', title: 'Цветы' },
  { value: 'toys', title: 'Игрушки' },
  { value: 'postcards', title: 'Открытки' },
];

export const Filter = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);
  const filters = useSelector((state) => state.filters);
  const searchRef = useRef(null);
  const { items, categories } = useSelector((state) => state.goods);

  const prevFiltersRef = useRef(filters);

  const debounceFetchGoods = useRef(
    debounce((filters) => {
      if (!filters.isSearch) {
        dispatch(fetchGoods(filters));
      }
    }, 300)
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);

    if (prevFilters.type !== filters.type && !filters.isSearch) {
      dispatch(fetchGoods(validFilters));
    } else {
      debounceFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;

    if (filters.isSearch) {
      setOpenChoice(-1);
    }
  }, [dispatch, debounceFetchGoods, filters]);

  useEffect(() => {
    searchRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  //handle
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const { value, name } = target;
    const title = target.labels[0].textContent;

    dispatch(changeType({ [name]: value, name: title }));
    setOpenChoice(-1);
  };

  const handlePriceChange = ({ target }) => {
    const { value, name } = target;
    // const newFilters = { ...filters, [name]: !isNaN(parseInt(value)) ? value : '', name: title };

    if (filters.type) {
      dispatch(changePrice({ name, value }));
    }
  };

  const handleCategoryChange = (category) => {
    if (category != '') {
      dispatch(changeCategory({ category: category, name: `Категория: "${category}"` }));
    } else {
      let title = '';
      filterTypes.forEach(type => {
        if (type.value === filters.type) {
          title = type.title;
        }
      });
      dispatch(changeCategory({ category: category, name: title }));
    }
    setOpenChoice(-1);
  };

  return (
    <section className={_.filter} ref={searchRef}>
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

            {(categories.length > 0 && filters.type != '') && (
              <Choices
                btnLabel='Тип товара'
                className={_.filter__choice_type}
                type='typeProduct'
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}>
                <div className={_.filter__choicesBox}>
                  <ul className={_.filter__typeList}>
                    <li className={_.filter__typeItem}>
                      <button
                        className={_.filter__typeButton}
                        type='button'
                        onClick={() => {
                          handleCategoryChange('');
                        }}>
                        Все товары
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category} className={_.filter__typeItem}>
                        <button
                          className={_.filter__typeButton + ' ' + `${category === filters.category ? _.filter__typeButton_active : ''}`}
                          type='button'
                          onClick={() => {
                            handleCategoryChange(category);
                          }}>
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Choices>
            )}
          </fieldset>
        </form>
      </div>
    </section>
  );
};
