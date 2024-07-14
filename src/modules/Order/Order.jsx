import { useDispatch, useSelector } from 'react-redux';
import _ from './Order.module.scss';
import { closeModal } from '../../store/orderSlice';
import { useCallback, useEffect } from 'react';


export const Order = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.order.isOpen);
  const isOrderReady = false;

  const handlerCloseOrder = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handlerCloseOrder();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handlerCloseOrder]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className={_.order} onClick={handlerCloseOrder}>
      <div className={_.order__wrapper} onClick={(e) => { e.stopPropagation() }}>
        {isOrderReady ?
          <>
            <h2 className={_.order__title}>Заказ оформлен!</h2>
            <p className={_.order__id}>Ваш номер заказа:
              971f365a-caa1-4cdb-9446-bad2eff047e1</p>
          </> :
          <>
            <h2 className={_.order__title}>Оформить заказ</h2>
            <form className={_.order__form} id="order">
              <fieldset className={_.order__fieldset}>
                <legend className={_.order__legend}>Данные заказчика</legend>
                <div className={_.order__inputGroup}>
                  <input className={_.order__input}
                    type="text" name="name-buyer" placeholder="Имя" />
                  <input className={_.order__input} type="text" name="phone-buyer"
                    placeholder="Телефон" />
                </div>
              </fieldset>
              <fieldset className={_.order__fieldset}>
                <legend className={_.order__legend}>Данные получателя</legend>
                <div className={_.order__inputGroup}>
                  <input className={_.order__input}
                    type="text" name="name-recipient" placeholder="Имя" />
                  <input
                    className={_.order__input} type="text" name="phone-recipient"
                    placeholder="Телефон" />
                </div>
              </fieldset>
              <fieldset className={_.order__fieldset}>
                <legend className={_.order__legend}>Адрес</legend>
                <div className={_.order__inputGroup}>
                  <input className={_.order__input}
                    type="text" name="street" placeholder="Улица" />
                  <input
                    className={_.order__input + ' ' + _.order__input_min} type="text" name="house"
                    placeholder="Дом" />
                  <input className={_.order__input + ' ' + _.order__input_min}
                    type="text" name="apartment" placeholder="Квартира" />
                </div>
              </fieldset>
              <fieldset className={_.order__fieldset}>
                <div className={_.order__payment}>
                  <label className={_.order__labelRadio}>
                    <input
                      className={_.order__radio} type="radio" name="payment-online"
                      value="true" defaultChecked />Оплата онлайн</label>
                </div>
                <div className={_.order__delivery}>
                  <label htmlFor="delivery">Доставка 01.07</label>
                  <input type="hidden" name="delivery-date" value="01.07" />
                  <div className={_.order__selectWrapper}>
                    <select className={_.order__select}
                      name="delivery-time" id="delivery">
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
          </>
        }
        <div className={_.order__footer}>
          <p className={_.order__total}>92100&nbsp;₽</p><button className={_.order__button}
            type="submit" form="order">Заказать</button>
        </div>
      </div>
      <button className={_.order__close} type="button" >×</button>
    </div>
  );
}