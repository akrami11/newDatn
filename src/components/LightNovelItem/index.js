import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './LightNovelItem.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function LightNovelItem({ item, series, follow, lightNovel, add }) {
  // console.log(item);
  const navigate = useNavigate();
  const handleClickLightNovel = () => {
    if (!add) return navigate('/read/' + item.ID);
  };
  const handleClickChapter = () => {
    return navigate('/read/' + item.ID + '/chapter/' + item.chapter);
  };
  const getChapter = (lid) => {
    // console.log('a`lo', lightNovel);
    if (Array.isArray(lightNovel) && lightNovel.length) {
      const newIndex = lightNovel.findIndex((ln) => ln.LID === lid);
      // console.log('onlindex', newIndex);
      return lightNovel[newIndex].chapter;
    }
    return false;
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('avt')}>
        <Image
          src={item.image ? item.image : images.noImage}
          onClick={handleClickLightNovel}
        />
      </div>
      <div className={cx('detail')}>
        <div className={cx('name')} onClick={handleClickLightNovel}>
          {item.name}
        </div>
        {!add && !series && (
          <div className={cx('chapter')} onClick={handleClickChapter}>
            Chap {getChapter(item.LID) || item.chapter}
          </div>
        )}
      </div>
    </div>
  );
}

export default LightNovelItem;
