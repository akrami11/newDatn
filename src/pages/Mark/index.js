import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Mark.module.scss';

import Fields from '~/components/Fields/index.js';
import LightNovelList from 'src/components/ListLightNovel';

const cx = classNames.bind(styles);
function Mark({ books, logginDetails, follow, history, lightNovel }) {
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    console.log('bookmark', bookmark);
  }, [bookmark]);

  useEffect(() => {
    if (localStorage.getItem('bookmark')) {
      const newBookmark = JSON.parse(localStorage.getItem('bookmark'));
      setBookmark(newBookmark);
      // console.log(fl);
      // if (Array.isArray(lightNovel) && lightNovel.length > 0) {
      //   lightNovel.map((data) => {
      //     if(data.findIndex(dt)=>dt.LID===fl)
      //     if (data.findByID(fl)) {
      //       return setBookmark((pre) => [...pre, data]);
      //     } else return false;
      //   });
      // }
    }
  }, []);
  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      <div className={cx('header')}>Truyện đã đánh dấu :</div>
      <div className={cx('main')}>
        <div className={cx('list')}>
          <Fields
            datas={bookmark}
            bookmark
            logginDetails={logginDetails}
          ></Fields>
        </div>
        <div className={cx('others')}>
          {follow && follow.length > 0 && (
            <LightNovelList
              title='Truyện theo dõi :'
              list={follow}
              follow
              lightNovel={lightNovel}
            ></LightNovelList>
          )}
          {history && history.length > 0 && (
            <LightNovelList
              title='Lịch sử đọc truyện :'
              list={history}
            ></LightNovelList>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mark;
