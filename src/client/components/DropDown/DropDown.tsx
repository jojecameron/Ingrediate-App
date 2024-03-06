import { DropDownProps } from '../../types';

const DropDown = (props: DropDownProps): JSX.Element => {
  const { label, value, onChange, options } = props;

  return (
    <div className="dropdown-parent">
      <label className="dropdown-label" htmlFor={label}>
        {label}
      </label>
      <select className="dropdown-select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option className="dropdown-option" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
