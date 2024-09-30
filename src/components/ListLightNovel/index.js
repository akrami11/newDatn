import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './ListLightNovel.module.scss';

import Item from '~/components/LightNovelItem';

const cx = classNames.bind(styles);
function ListLightNovel({ title, list, series, follow, lightNovel }) {
  
  const navigate = useNavigate();
  const handleClickTitle = () => {
    series || (follow ? navigate('/follow') : navigate('/history'));
  };
  return (
    <div className={cx('wrapper')}>
      {title && (
        <div className={cx('title')} onClick={handleClickTitle}>
          {title}
        </div>
      )}
      {Array.isArray(list) &&
        list.length > 0 &&
        list.map(
          (item, index) =>
            index < 5 && (
              <Item
                key={index}
                item={item}
                series={series}
                follow={follow}
                lightNovel={lightNovel}
              ></Item>
            )
        )}
    </div>
  );
}

export default ListLightNovel;
