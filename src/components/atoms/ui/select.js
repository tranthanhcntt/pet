import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ id, options, value, onValueChange, placeholder, disabled, children }) => {
  const handleChange = (event) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  return (
    <select
      id={id}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="select-component"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options?.map((option) => (
        <SelectItem key={option.value} value={option.value} label={option.label} />
      ))}
      {children}
    </select>
  );
};

export const SelectItem = ({ value, label, children }) => (
  <option value={value}>{children || label}</option>
);

SelectItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  children: PropTypes.node,
};

Select.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Select.defaultProps = {
  id: '',
  options: [],
  value: '',
  placeholder: 'Select an option',
  disabled: false,
  children: null,
};

export default Select;