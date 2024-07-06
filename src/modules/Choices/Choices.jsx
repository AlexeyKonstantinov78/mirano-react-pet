import _ from './Choices.module.scss';

export const Choices = ({ children, btnLabel, className = '', isOpen, onToggle }) => {


  return (
    <div className={_.choices + ' ' + className}>
      <button className={_.choices__btn}
        type="button"
        onClick={onToggle}
      >{btnLabel}</button>
      {isOpen && <>{children}</>}
    </div>
  )
};