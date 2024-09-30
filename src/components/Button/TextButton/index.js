// import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './TextButton.module.scss';

const cx = classNames.bind(styles);
function Button({
  children,
  getRef,
  to,
  position,
  size,
  ref,
  type,
  onClick,
  margin,
  radius = false,
  changeColor = false,
  insideHover = false,
  hover = false,
  outline = false,
  round = false,
  noBorder = false,
  ...props
}) {
  // const Comp = to ? Link : src || children ? 'button' : 'div';
  const Comp = to ? Link : 'div';
  const classes = cx('wrapper', type, size, {
    outline,
    round,
    changeColor,
    radius,
    noBorder,
    margin,
  });

  const handleClick = () => {
    return onClick && onClick();
  };
  return (
    <div className={classes}>
      <Comp
        to={to ? to : ''}
        className={cx('content', size, { round, hover, noBorder })}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    </div>
  );
}

export default Button;
