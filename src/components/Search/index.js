import classNames from 'classnames/bind';

import Input from '~/components/Input';
import Button from '~/components/Button';

import styles from './Search.module.scss';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSistrix } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
function Search({onChange,onClickSearchButton, ...props }) {
  const onclick = () => {
    return onClickSearchButton && onClickSearchButton();
    // return alert('asdasdas');
  };
  return (
    <div className={cx('wrapper', { ...props })}>
      <Input value={''} onChange={onChange} {...props} />
      <Button onClick={onclick} type='searchButton' icon={faSistrix}></Button>
    </div>
  );
}

export default Search;
