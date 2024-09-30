import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookTypes.module.scss';

// import request from '~/utils/request';
// import images from '~/assets/images';
import Input from '~/components/Input';
import TextButton from '~/components/Button/TextButton';
// import User from '~/assets/db/tables/user.js';
import { getTag } from '~/assets/content';

const list = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 51,
];

const cx = classNames.bind(styles);

function BookTypes({ onCloseBox, onSearchByTypes }) {
  const [categories, setCategories] = useState([]);
  const [selectType, setSelectType] = useState(1);

  const navigate = useNavigate();

  const handleSelectCategory = (val) => {
    // console.log(val);
    const checkValue = (value) => value === val;
    const newIndex = categories.findIndex(checkValue);
    // console.log(newIndex);
    if (newIndex < 0) return setCategories((types) => [...types, val]);
    else categories.splice(newIndex, 1);
  };

  const handleCloseBox = () => {
    return onCloseBox();
  };
  const handleClickSearchButton = () => {
    onSearchByTypes(categories, selectType);
    onCloseBox();
    return navigate('/search');
  };
  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      <div className={cx('title')}>
        Chọn thể loại bạn muốn :
        {/* <select
          name='slc1'
          id='slcType'
          className={cx('selection')}
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value={1}>Tất cả</option>
          <option value={2}>Light novel</option>
          <option value={3}>Sách</option>
        </select> */}
      </div>
      <div className={cx('main')}>
        {list.map((item, index) => (
          <div className={cx('types')} key={index}>
            <div>
              <Input
                type='checkbox'
                id={index + 1}
                onClick={() => handleSelectCategory(item)}
              />
            </div>
            <label htmlFor={index + 1} className={cx('savePassLabel')}>
              {getTag(item)}
            </label>
          </div>
        ))}
      </div>
      <div className={cx('control')}>
        <div className={cx('button')}>
          <TextButton
            type={'primary'}
            size='large'
            onClick={handleClickSearchButton}
            radius
            hover
          >
            Tìm kiếm
          </TextButton>
        </div>
        <div className={cx('button')}>
          <TextButton
            type={'warning'}
            size='large'
            onClick={handleCloseBox}
            radius
            hover
          >
            Cancel
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default BookTypes;
