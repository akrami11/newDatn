import classNames from 'classnames/bind';
import styles from './Row.module.scss';
// import Input from '~/components/Input';

const cx = classNames.bind(styles);
function Row({ children, header }) {
  return <tr className={cx('wrapper', { header })}>{children}</tr>;
}

export default Row;
