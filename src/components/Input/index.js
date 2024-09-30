import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const formatDate = (date) => {
  const newDate = new Date(date);
  const dd =
    newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
  const mm =
    newDate.getMonth() + 1 < 10
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  const yyyy = newDate.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

function Input({
  round,
  outline,
  onChange,
  onKeyDown,
  onKeyUp,
  onClick,
  value,
  label,
  placeHolder,
  disabled,
  border,
  id,
  type,
  autocomplete,
  checked,
  ...props
}) {
  const [newValue, setNewValue] = useState('');
  useEffect(() => {
    setNewValue(type === 'date' ? formatDate(value) : value);
  }, [value, type]);
  // useEffect(() => {
  //   if (newValue.length === 0) {
  //     setNewValue(type === 'date' ? formatDate(value) : value);
  //   }
  // }, [newValue, value, type]);
  const classes = {
    round,
    outline,
    border: !border,
  };
  const inputId = id ? id : '';
  const handleChangeValue = (value) => {
    setNewValue(value);
    return onChange && onChange(value);
  };
  const handleKeyDown = (e) => {
    return onKeyDown && onKeyDown(e.key);
  };
  const handleKeyUp = (e) => {
    return onKeyUp && onKeyUp(e.key);
  };
  return (
    <div className={cx('wrapper', classes)}>
      <input
        type={type ? type : 'text'}
        id={inputId}
        autoComplete={autocomplete && autocomplete}
        className={cx(
          'main',
          classes,
          (type === 'checkBox' || type === 'checkbox') && 'checkBox'
        )}
        placeholder={placeHolder}
        value={newValue}
        disabled={disabled}
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        onChange={(e) => handleChangeValue(e.target.value)}
        onClick={onClick && onClick}
        checked={checked}
        {...props}
        spellCheck={false}
      />
      {label && (
        <label htmlFor={inputId} className={cx('label')}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Input;
