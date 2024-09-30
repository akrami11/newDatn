import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Item.module.scss';
// import IconButton from '~/components/Button/IconButton';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function Item({ item, books, type, lightnovel }) {
  // console.log('item : ', item);
  const [mouseDownX, setMouseDownX] = useState(0);
  const [mouseDownY, setMouseDownY] = useState(0);

  const navigate = useNavigate();

  const handleMouseUp = (e) => {
    if (
      mouseDownX - e.clientX < 30 &&
      mouseDownX - e.clientX > -30 &&
      mouseDownY - e.clientY < 30 &&
      mouseDownY - e.clientY > -30
    ) {
      if (lightnovel)
        return navigate('/read/' + item.LID + '/chapter/' + item.chapter);
      return navigate('/read/' + item.LID);
    }
  };
  const handleMouseDown = (e) => {
    setMouseDownX(e.clientX);
    setMouseDownY(e.clientY);
  };
  const handleMouseEnter = () => {
    setMouseDownX(0);
    setMouseDownY(0);
  };
  return (
    <div
      className={cx('wrapper')}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      {type && (
        <div className={cx('itemTag')}>
          <div className={cx('tagName')}>{type}</div>
        </div>
      )}
      <div className={cx('image')}>
        <Image src={item.image} size={'item'}></Image>
      </div>

      <div className={cx('itemName')}>{item.name}</div>
    </div>
  );
}
export default Item;
