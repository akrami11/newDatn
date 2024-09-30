import classNames from 'classnames/bind';

import TextButton from '~/components/Button/TextButton';
import { getTag } from '~/assets/content';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

function Tag({ value }) {
  // console.log(getTag(value));
  return (
    <div className={cx('wrapper')}>
      <TextButton
        type='info'
        size='mini'
        round
        // onClick={handleAddCart}
        hover
        to={'../search/' + value}
      >
        {getTag(value)}
      </TextButton>
    </div>
  );
}

export default Tag;
