// import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function Button({
  children,
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
  // const Comp = to ? Link : src || children ? 'button' : 'div';
  const Comp = to ? Link : 'div';
  const classes = cx('content', type, {
    outline,
    round,
    changeColor,
  });

  const handleClick = () => {
    return onClick && onClick();
  };
  // const ImageButton = (src, ref, ...props) => {
  //   console.log('imgbut : ', src);
  //   return <Image src={src} ref={ref} {...props} />;
  // };
  const IconButton = (icon) => {
    return (
      <div className={cx('icon', size, { changeColor, insideHover, round })}>
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      </div>
    );
  };
  // const handleGetRef = () => {
  //   return onClick && onClick(newRef);
  // };
  return (
    <div className={cx('wrapper', type, size, { changeColor, hover, round })}>
      <Comp
        to={to ? to : ''}
        onClick={handleClick}
        className={classes}
        {...props}
      >
        {icon && position !== 'right' && IconButton(icon)}
        {src ? (
          <Image
            src={src && src}
            ref={ref && ref}
            size={size && size}
            {...props}
          />
        ) : (
          children
        )}
        {icon && position === 'right' && IconButton(icon)}
      </Comp>
    </div>
  );
  //   return { children };
}

export default Button;
