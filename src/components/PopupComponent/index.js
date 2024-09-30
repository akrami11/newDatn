import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Popup.module.scss';

const cx = classNames.bind(styles);

function Popup({ children, onClick, noBackground }) {
  const [active, setActive] = useState(false);
  const [hasInside, setInside] = useState(false);

  useEffect(() => {
    if (hasInside) {
      setActive(true);
    } else setActive(false);
  }, [hasInside]);

  const handleClickOutside = () => {
    if (!active) {
      return onClick && onClick();
    }
  };
  const handleMouseMoveInside = (e) => {
    return setInside(true);
  };
  const handleMouseOut = () => {
    return setInside(false);
  };
  return (
    <div
      className={cx('wrapper', { noBackground })}
      onClick={handleClickOutside}
    >
      <div
        className={cx('inside')}
        onMouseMove={handleMouseMoveInside}
        onMouseOut={handleMouseOut}
      >
        {children}
      </div>
    </div>
  );
}

export default Popup;
