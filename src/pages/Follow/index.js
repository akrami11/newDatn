// import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import Fields from '~/components/Fields/index.js';
import LightNovelList from 'src/components/ListLightNovel';
const cx = classNames.bind(styles);
// const setUnique = (arr) => {
//   if (Array.isArray(arr)) {
//     var unique = arr.filter(
//       (value, index, array) => array.indexOf(value) === index
//     );
//     return unique;
//   }
//   return [];
// };
function Follow({ logginDetails, books, follow, history, lightNovel }) {
  // console.log(lightNovel);
  // const [newLN, setNewLN] = useState([]);
  // const [hasGetNewLN, getNewLN] = useState(false);
  // const [storageHistory, setStorageHistory] = useState([]);
  // console.log('follow', follow);
  // useEffect(() => {
  //   if (localStorage.getItem('read')) {
  //     const newHistory = JSON.parse(localStorage.getItem('read'));
  //     console.log('newHistory : ', newHistory);
  //     setStorageHistory(newHistory);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (Array.isArray(books) && books.length) {
  //     if (!hasGetNewLN) {
  //       const newArray = logginDetails.follow.map((ln) => ln.ID);
  //       console.log(setUnique(newArray));
  //       if (books.length) {
  //         setUnique(newArray).map((arr) => {
  //           const newIndex = books.findIndex((book) => arr === book.ID);
  //           books[newIndex] && setNewLN((pre) => [...pre, books[newIndex]]);
  //           return 1;
  //         });
  //         return getNewLN(false);
  //       }
  //     }
  //   }
  // }, [logginDetails, hasGetNewLN, books]);
  console.log('history', history);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>Truyện theo dõi :</div>
      <div className={cx('main')}>
        {Array.isArray(follow) &&
          follow.length > 0 &&
          lightNovel.length > 0 && (
            // <Fields datas={newLN} lightnovel={lightNovel}></Fields>
            <div className={cx('list')}>
              <Fields
                datas={follow}
                books={books}
                history={history}
                logginDetails={logginDetails}
                lightnovel={lightNovel}
              ></Fields>
            </div>
          )}
        {history && history.length > 0 && (
          <div className={cx('others')}>
            <LightNovelList
              title='Lịch sử đọc truyện :'
              list={history}
            ></LightNovelList>
          </div>
        )}
      </div>
    </div>
  );
}

export default Follow;
