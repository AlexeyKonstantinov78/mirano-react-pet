import { useDispatch, useSelector } from 'react-redux';
import _ from './Header.module.scss';
import { toggleCart } from '../../store/cartSlice';
import { fetchGoods } from '../../store/goodsSlice';
import { TITLE_SEARCH } from '../../const';
import { changeFiltersIsSearch, closeFilters } from '../../store/filtersSlice';
import { changeSearchValue } from '../../store/searchSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const itemsCart = useSelector((state) => state.cart.items);
  const searchValue = useSelector(state => state.search.value);


  const heandlerCartToggle = () => {
    dispatch(toggleCart());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim().length === 0) return;
    dispatch(fetchGoods({ search: searchValue, name: `${TITLE_SEARCH} "${searchValue}"` }));
    dispatch(closeFilters());
    dispatch(changeSearchValue(""));
  }

  return (
    <header className={_.header}>
      <div className={`container ${_.header__container}`}>
        <form className={_.header__form} action='#' onSubmit={handleSubmit}>
          <input
            className={_.header__input}
            type='search'
            name='search'
            placeholder='Букет из роз'
            value={searchValue}
            onChange={(e) => { dispatch(changeSearchValue(e.target.value)) }}
          />

          <button className={_.header__searchButton} aria-label='начать поиск'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07'
                stroke='white'
              />
            </svg>
          </button>
        </form>

        <img
          className={_.header__logo}
          src='/img/logo.svg'
          alt='Логотип Mirano Flower Boutique'
        />

        <button className={_.header__cartButton} onClick={heandlerCartToggle}>
          {itemsCart.reduce((acc, item) => item.quantity + acc, 0)}
        </button>
      </div>
    </header>
  );
};
