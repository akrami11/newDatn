import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
// import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';

import styles from './Col.module.scss';

// import Popup from '~/components/PopupComponent';
import Input from '~/components/Input';
import Image from '~/components/Image';
import EditableInput from '~/components/EditableInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import request from '~/utils/request';

const cx = classNames.bind(styles);

function Col({
  children,
  handleChangeValue,
  header,
  disable,
  fieldName,
  index,
  restore,
  button,
  colSpan,
  onClick,
  size,
  icon,
  after,
  typeId,
}) {
  const [newChild] = useState(children);
  const [newValue, setValue] = useState(newChild);
  const [newSex, setSex] = useState(children === 'male' ? true : false);
  const [type] = useState(
    fieldName === 'sex' ||
      fieldName === 'dateOfBirth' ||
      fieldName === 'image' ||
      fieldName === 'file'
      ? fieldName
      : button === 'button'
      ? 'button'
      : ''
  );
  useEffect(() => {
    setValue(children);
  }, [children]);
  // const [bbbbb, setbb] = useState('2001-07-22');
  // const [hasReset, setReset] = useState(false);

  // const [hasEnter, setEnter] = useState(false);
  // const [hasShift, setShift] = useState(false);

  // useEffect(() => {
  //   setReset(false);
  // }, [newValue]);

  const handleChange = (value) => {
    // console.log('change : ', value);

    // console.log(value);
    // setValue(value);
    return handleChangeValue && handleChangeValue(value);
  };
  const handleChangeSex = () => {
    // console.log('change : ', newSex);
    setSex(!newSex);
    return handleChangeValue(!newSex);
  };

  const handleClick = () => {
    return onClick && onClick();
  };

  const CheckBoxInput = () => {
    return (
      <div className={cx('boxInput')}>
        <input
          type={'checkBox'}
          id={index + (typeId ? '_' + typeId : '')}
          checked={newSex}
          onChange={handleChangeSex}
          disabled={disable}
        />
        <label htmlFor={index}>{newSex ? 'Nam' : 'Nữ'}</label>
      </div>
    );
  };
  const FileInput = () => {
    return (
      <>
        <input
          type='file'
          style={{ display: 'none' }}
          id={index + '_file_inp'}
          onChange={handleUploadFile}
          disabled={disable}
        />
        <label htmlFor={index + '_file_inp'}>{children}</label>
      </>
      // <Input type={'file'} id={index + '_file'} label={children.name}></Input>
    );
  };
  const handleUploadFile = (e) => {
    handleChange(e.target.files[0]);
  };
  const variableToString = (val) => {
    if (typeof val !== 'string') {
      let newStr = '';
      const str = newStr.concat(val);
      return str.toString();
    } else return val;
  };
  const DateInput = (date) => {
    return (
      <Input
        type='date'
        disabled={disable}
        // value={getTimeFromDate('01-06-1999')}
        value={date}
        // value={getTimeFromDate(date)}
        onChange={(val) => handleChange(val)}
      />
    );
  };
  return (
    <td
      className={cx('wrapper', { header })}
      onClick={handleClick}
      colSpan={colSpan ? colSpan : 1}
    >
      {
        !header && !type && (
          <EditableInput
            // innerRef={sendRef}
            baseValue={variableToString(newValue)}
            onChange={handleChange}
            resetValue={restore}
            // onKeyDown={handleKeyDown}
            // onKeyUp={handleKeyUp}
            replaceAll={'Nhập thông tin'}
            replace={'Nhập thông tin'}
            noBackground
            after={after}
            fieldName={fieldName}
            disabled={disable}
            centerAline
          />
        )
        // ((disable && <div className={cx('input')}>{newValue}</div>) ||
        //   (!disable && (
        //     <Input
        //       type='text'
        //       value={newValue}
        //       placeHolder={newChild}
        //       border
        //       disabled={disable}
        //       onChange={(val) => handleChange(val)}
        //     />
        // )))
      }
      {!header && type === 'sex' && <CheckBoxInput />}
      {!header && type === 'file' && <FileInput></FileInput>}
      {!header &&
        type === 'dateOfBirth' &&
        // <Input
        //   type='date'
        //   size='mini'
        //   value={newValue}
        //   disabled={disable}
        //   onChange={(val) => handleChange(val)}
        // />
        DateInput(newValue)}
      {!header && type === 'image' && (
        <Image
          name={type}
          index={index}
          src={newValue}
          typeId={typeId}
          size={size ? size : 'mini'}
          disabled={disable}
          onChange={(val) => handleChange(val)}
        />
      )}
      {!header && type === 'button' && children}
      {header && (
        <div className={cx('headerField')}>
          <div className={cx('headerTitle')}>{children}</div>{' '}
          {icon && <FontAwesomeIcon icon={icon} />}
        </div>
      )}
    </td>
  );
}

export default Col;
