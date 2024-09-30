import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './LogMessage.module.scss';

const cx = classNames.bind(styles);

function LogMessage({ act, onAutoClose, undo, status }) {
  const title = status ? 'thành công!' : 'thất bại!';
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onAutoClose();
    }, 3000);
    return () => clearTimeout(timeOut);
  });

  return (
    <div
      className={cx(
        'wrapper',
        status ? 'success' : 'warning',
        undo && 'warning'
      )}
    >
      {act} {title}
    </div>
  );
}

export default LogMessage;
