// import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ImageButton.module.scss';

import Image from '~/components/Image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function ImageButton({
  getRef,
  to,
  src,
  icon,
  position,
  size,
  ref,
  type,
  onClick,
  changeColor = false,
  insideHover = false,
  hover = false,
  outline = false,
  round = false,
  ...props
}) {
  const Comp = to ? Link : 'div';
  const classes = cx('content', type, {
    outline,
    round,
    changeColor,
  });

  const handleClick = () => {
    return onClick && onClick();
  };

  return (
    <div className={cx('wrapper', type, size, { changeColor, hover, round })}>
      <Comp
        to={to ? to : ''}
        onClick={handleClick}
        className={classes}
        {...props}
      >
        <Image
          src={src && src}
          ref={ref && ref}
          size={size && size}
          {...props}
        />
      </Comp>
    </div>
  );
  //   return { children };
}

export default ImageButton;
