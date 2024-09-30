import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './History.module.scss';

import Fields from '~/components/Fields/index.js';
import LightNovelList from 'src/components/ListLightNovel';
const cx = classNames.bind(styles);
function History({ books, logginDetails, follow, lightNovel }) {
  const [history, setHistory] = useState([]);
  const [storageHistory, setStorageHistory] = useState([]);
  const [hasGetNewHistory, getNewGetNewHistory] = useState(false);

  useEffect(() => {
    if (!hasGetNewHistory) {
      if (Array.isArray(books) && books.length) {
        const newArray = storageHistory.map((ln) => ln.ID);
        if (newArray.length) {
          newArray.map((arr) => {
            const newIndex = books.findIndex((book) => arr === book.ID);
            books[newIndex] && setHistory((pre) => [...pre, books[newIndex]]);
            return 1;
          });
          return getNewGetNewHistory(true);
        }
        return;
      }
    }
  }, [storageHistory, hasGetNewHistory, books]);

  useEffect(() => {
    if (localStorage.getItem('read')) {
      const newHistory = JSON.parse(localStorage.getItem('read'));
      setStorageHistory(newHistory);
    }
  }, []);
  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      <div className={cx('header')}>Truyện đã đọc :</div>
      <div className={cx('main')}>
        <div className={cx('list')}>
          <Fields
            datas={history}
            history={storageHistory}
            books={books}
            logginDetails={logginDetails}
            lightnovel={lightNovel}
          ></Fields>
        </div>
       {follow&&follow.lenght>0 &&<div className={cx('others')}>
          <LightNovelList
            title='Truyện theo dõi :'
            list={follow}
            follow
            lightNovel={lightNovel}
          ></LightNovelList>
        </div>}
      </div>
    </div>
  );
}

export default History;
