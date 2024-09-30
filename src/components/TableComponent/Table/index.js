import classNames from 'classnames/bind';
import styles from './Table.module.scss';
// import Input from '~/components/Input';

const cx = classNames.bind(styles);
function Table({ children, header }) {
  return (
    <table className={cx('wrapper', { header })}>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
