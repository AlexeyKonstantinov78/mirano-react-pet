import { toggleChoices } from '../../store/choicesSlice';
import _ from './Choices.module.scss';
import { useDispatch } from 'react-redux';

export const Choices = ({ children, btnLabel, className = '', type }) => {
  const dispatch = useDispatch();

  const handleToggle = (type) => {
    dispatch(toggleChoices(type));
  };

  return (
    <div className={_.choices + ' ' + className}>
      <button className={_.choices__btn}
        type="button"
        onClick={() => handleToggle(type)}
      >{btnLabel}</button>
      {children}
    </div>
  )
};