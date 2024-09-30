import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Uploaded.module.scss';
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
function Uploaded({ logginDetails, books, follow, history, lightNovel }) {
  console.log(books);
  const [upload, setUpload] = useState([]);
  useEffect(() => {
    if (!upload.length) {
      if (Array.isArray(books) && books.length) {
        if (logginDetails.ID) {
          books.map(
            (book) =>
              book.AuthorID === logginDetails.ID &&
              setUpload((pre) => [...pre, book]) &&
              console.log(book)
          );
        }
      }
    }
  }, [books, logginDetails, upload]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>Truyện theo dõi :</div>
      <div className={cx('main')}>
        {Array.isArray(follow) && follow.length && lightNovel.length && (
          // <Fields datas={newLN} lightnovel={lightNovel}></Fields>
          <div className={cx('list')}>
            <Fields
              datas={upload}
              books={books}
              history={history}
              logginDetails={logginDetails}
              lightnovel={lightNovel}
            ></Fields>
          </div>
        )}
        <div className={cx('others')}>
          <LightNovelList
            title='Lịch sử đọc truyện :'
            list={history}
          ></LightNovelList>
          <LightNovelList
            title='Truyện theo dõi :'
            list={follow}
            follow
            lightNovel={lightNovel}
          ></LightNovelList>
        </div>
      </div>
    </div>
  );
}

export default Uploaded;
