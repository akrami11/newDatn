import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Fields.module.scss';
import Item from '~/components/Item';

import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import LightNovel from '~/pages/LightNovel';
import { getTimeDetail } from '~/assets/content';

const cx = classNames.bind(styles);

function Fields({
  datas,
  books,
  history,
  lightnovel,
  bookmark,
  logginDetails,
}) {
  // console.log(books);
  const navigate = useNavigate();
  const [numberShow, setNumberShow] = useState(5);
  const handleClickChapter = (id, chapter) => {
    return navigate('/read/' + id + '/chapter/' + chapter);
  };

  const getChapter = (id, chapter) => {
    if (Array.isArray(history) && history.length) {
      const newIndex = history.findIndex((hs) => hs.ID === id);
      if (newIndex >= 0) {
        const newHistory = history[newIndex];
        if (Array.isArray(newHistory.visited) && newHistory.visited.length) {
          var visited = newHistory.visited;
          // console.log(
          //   'newIndex ',
          //   visited,
          //   chapter,
          //   visited.findIndex((vs) => vs === chapter)
          // );
          if (visited.findIndex((vs) => vs === chapter) >= 0) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const handleClickMore = () => {
    setNumberShow(numberShow + 5);
  };
  return (
    <div className={cx('wrapper')}>
      <div>
        {Array.isArray(datas) &&
          datas.map((item, index) => {
            if (Array.isArray(lightnovel) && lightnovel.length && item) {
              var chapterShow = [];
              lightnovel.map(
                (ln) => ln.LID === item.LID && chapterShow.push(ln)
              );
            }
            if (index < numberShow) {
              return (
                <div key={index}>
                  <Tippy
                    interactive='true'
                    arrow='true'
                    placement='auto'
                    offset={[0, 0]}
                    render={(attrs) => {
                      // <div
                      //   style={{
                      //     width: '100px',
                      //     height: '100px',
                      //     backgroundColor: 'red',
                      //   }}
                      // >
                      //   {' '}
                      // </div>
                      if (!bookmark)
                        return (
                          <div className={cx('preview')}>
                            <LightNovel
                              books={datas}
                              itemID={item.LID}
                              logginDetails={logginDetails}
                              item
                              key={index}
                            ></LightNovel>
                          </div>
                        );
                    }}
                  >
                    <div className={cx('content')} key={index}>
                      <Item books={books} item={item} lightnovel={bookmark} />

                      {Array.isArray(chapterShow) && chapterShow.length > 0 && (
                        <div className={cx('details')}>
                          <div key={index} className={cx('chapterTitle')}>
                            <div>Chương </div>
                            <div>Cập nhật</div>
                          </div>
                          {chapterShow.map((chapter, index) => {
                            if (index < 3) {
                              return (
                                <div
                                  key={index}
                                  className={cx(
                                    'chapter',
                                    getChapter(item.ID, chapter.chapter) &&
                                      'visited'
                                  )}
                                  onClick={() =>
                                    handleClickChapter(
                                      item.ID || item.LID,
                                      chapter.chapter
                                    )
                                  }
                                >
                                  <div>Chương {chapter.chapter}</div>
                                  {getTimeDetail(chapter.createdAt)}
                                </div>
                              );
                            } else return <div key={index}></div>;
                          })}
                        </div>
                      )}
                    </div>
                  </Tippy>
                </div>
              );
            } else return <div key={index}></div>;
          })}
      </div>
      <span onClick={handleClickMore} className={cx('readmore')}>
        Xem thêm
      </span>
    </div>
  );
}

export default Fields;
