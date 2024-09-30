import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable';
import Button from '~/components/Button/IconButton';

import styles from './EditableInput.module.scss';

import { checkInputEditable } from '~/assets/content/checkString';
import { getPrice, setPrice } from '~/assets/content/';
const cx = classNames.bind(styles);
// const isNumber = (value) => {
//   return typeof value === 'number' && isFinite(value);
// };
function EditableInput({
  baseValue,
  replace,
  onChange,
  onKeyDown,
  onKeyUp,
  type,
  innerRef,
  resetValue,
  replaceAll,
  disabled,
  icon,
  after,
  fieldName,
  onButtonClick,
  buttonType,
  contentOnEdit,
  centerAline,
  noBackground,
  fullBox,
  innerPadding,
}) {
  const [hasEditAble, setHasEditAble] = useState(false);
  const [typeValue, setTypeValue] = useState(replace);
  const [newRsValue, setNewRsValue] = useState(false);
  useEffect(() => {
    if (baseValue) {
      setTypeValue(baseValue);
    }
  }, [baseValue]);
  useEffect(() => {
    if (resetValue) {
      setNewRsValue(resetValue);
    }
    return setTypeValue('');
  }, [newRsValue, resetValue]);
  useEffect(() => {
    if (hasEditAble) {
      if (typeValue === replace) {
        return setTypeValue('');
      }
    } else {
      if (typeValue === '') {
        if (baseValue) return setTypeValue(baseValue);
        else return setTypeValue(replace);
      }
    }
  }, [typeValue, hasEditAble, replace, onChange, baseValue]);

  const handleKeyDown = (e) => {
    // console.log(e.target.value);
    return onKeyDown && onKeyDown(e);
  };
  const handleKeyUp = (e) => {
    return onKeyUp && onKeyUp(e);
  };
  const handleFocusMessage = () => {
    if (!contentOnEdit) {
      return setHasEditAble(true);
    }
  };
  const handleTypeMessage = (e) => {
    const newValue =
      fieldName === 'salary'
        ? setPrice(checkInputEditable(e.target.value))
        : checkInputEditable(e.target.value);
    setTypeValue(newValue);
    return onChange && onChange(newValue);
  };
  const handleBlurMessage = () => {
    if (!contentOnEdit) {
      return setHasEditAble(false);
    }
  };
  return (
    <div className={cx('wrapper', { fullBox })}>
      <div
        className={cx('editText', !disabled && 'disable', {
          noBackground,
          centerAline,
          after,
          fullBox,
        })}
      >
        <ContentEditable
          html={fieldName === 'salary' ? getPrice(typeValue) : typeValue}
          innerRef={innerRef}
          className={cx(
            'editableInput',
            { centerAline, fullBox, innerPadding },
            typeValue === replace && 'replace'
          )}
          onFocus={handleFocusMessage}
          onChange={handleTypeMessage}
          onBlur={handleBlurMessage}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          spellCheck='false'
          disabled={disabled}
        />
      </div>
      {icon && (
        <div className={cx('editAction')}>
          <Button
            icon={icon && icon}
            onClick={onButtonClick && onButtonClick}
            type={buttonType && buttonType}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default EditableInput;
