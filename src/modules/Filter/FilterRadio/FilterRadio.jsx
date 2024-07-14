import { useSelector } from 'react-redux';

export const FilterRadio = ({ handleTypeChange, data, _ }) => {
  const filters = useSelector(state => state.filters);

  return (
    <>
      <input
        className={_.filter__radio}
        type='radio'
        name='type'
        value={data.value}
        id={data.value}
        checked={filters.type === data.value}
        onChange={handleTypeChange}
      />
      <label
        className={_.filter__label + ' ' + _[`filter__label_${data.value}`]}
        htmlFor={data.value}>
        {data.title}
      </label>
    </>
  );
}