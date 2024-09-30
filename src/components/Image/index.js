// import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Image.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Image({
  className,
  type,
  size,
  name,
  round,
  index,
  typeId,
  onChange,
  onClick,
  disabled,
  outline,
  ...props
}) {
  const [newImg, setNewImg] = useState({ preview: '', raw: '' });
  // const [disable] = useState(disabled);
  // const [hasGetValue, setGetValue] = useState(false);
  const classes = cx('content', size, className, type, round, outline);
  // useEffect(() => {
  //   if (name === 'image') {
  //     if (newImg.preview && hasGetValue) {
  //       onChange && onChange(newImg);
  //       return setGetValue(false);
  //     }
  //   }
  // }, [name, newImg, onChange, hasGetValue]);
  const handlePhotoChange = async (e) => {
    if (e.target.files.length) {
      const newUploadImage = await {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      };
      setNewImg(newUploadImage);
      return onChange(newUploadImage);
    }
  };
  const handleClickImage = () => {
    return onClick && onClick();
  };
  return (
    <div className={cx('wrapper')}>
      {!name ? (
        <img className={classes} onClick={handleClickImage} {...props} alt='' />
      ) : (
        <>
          <input
            name='image'
            type='file'
            disabled={disabled}
            id={(typeId ? typeId + '_' : '') + name + index + '_upload'}
            style={{ display: 'none' }}
            onChange={(e) => handlePhotoChange(e)}
          />
          <label className={cx('content')} htmlFor={name + index + '_upload'}>
            {newImg.preview ? (
              <img className={classes} src={newImg.preview} alt={name} />
            ) : (
              <img className={classes} {...props} alt='' />
            )}
          </label>
        </>
      )}
    </div>
  );
}

export default Image;
