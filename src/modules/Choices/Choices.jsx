import { useState } from 'react';
import _ from './Choices.module.scss';

export const Choices = ({ children, btnLabel, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <div className={_.choices + ' ' + className}>
      <button className={_.choices__btn}
        type="button"
        onClick={handleToggle}
      >{btnLabel}</button>
      {isOpen &&
        <div className={_.choices__box}>
          {children}
        </div>
      }
    </div>
  )
};