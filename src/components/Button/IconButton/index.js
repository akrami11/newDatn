import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './IconButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function Button({
  getRef,
  to,
  icon,
  size,
  type,
  onClick,
  radius,
  noBackground = false,
  hover = false,
  outline = false,
  round = false,
  ...props
}) {
  const classes = cx('wrapper', type, size, {
    outline,
    round,
    radius,
    noBackground,
  });
  const handleClick = () => {
    return onClick && onClick();
  };
  const Comp = to ? Link : 'div';

  return (
    // <Comp className={classes} onClick={handleClick} to={to ? to : ''}>
    //   <FontAwesomeIcon icon={icon && icon}></FontAwesomeIcon>
    // </Comp>
    <div className={classes}>
      <Comp
        to={to ? to : ''}
        className={cx('content', type, size, {
          round,
          hover,
          radius,
          noBackground,
        })}
        onClick={handleClick}
        {...props}
      >
        <FontAwesomeIcon icon={icon && icon}></FontAwesomeIcon>
      </Comp>
    </div>
  );
}

export default Button;
