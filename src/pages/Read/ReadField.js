import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Read.module.scss';
import request from '~/utils/request';
import { getIcon } from '~/assets/content';
import Tippy from '@tippyjs/react';
import Image from '~/components/Image';
import 'tippy.js/dist/tippy.css';
import IconButton from '~/components/Button/IconButton';

const getBookmark = (id, chapter) => {
  const bookmark = localStorage.getItem('bookmark')
    ? JSON.parse(localStorage.getItem('bookmark'))
    : [];
  // const bookmark = cncn;
  if (Array.isArray(bookmark)) {
    const newIndex = bookmark.findIndex((data) => {
      if (data.LID === id && data.chapter === chapter) {
        return true;
      } else return false;
    });
    if (newIndex >= 0) {
      return bookmark[newIndex];
    }
  }
  return {};
};

const cx = classNames.bind(styles);
function ReadField({
  file,
  mark,
  wordSize,
  fontWord,
  pageColor,
  lightNovel,
  allowMarkInside,
  ID,
  chapterID,
  name,
  image,
  onClick,
  clearMark,
  onRead,
}) {
  // console.log('mark : ', );
  const [showText, setShowText] = useState([]);
  const [marker, setMarker] = useState({});
  const [oldMarker, setOldMarker] = useState(getBookmark(ID, chapterID));

  useEffect(() => {
    lightNovel.addView();
    onRead && onRead();
  }, [lightNovel, onRead]);
  useEffect(() => {
    if (ID && chapterID) {
      setOldMarker(getBookmark(ID, chapterID));
    }
  }, [ID, chapterID, marker]);
  useEffect(() => {
    if (file) {
      console.log('get details');
      request
        .get('/lightnovel/read/' + file)
        .then((res) => {
          setShowText(res.data);
        })
        .catch(() => console.log('err'));
    }
  }, [file]);
  const handleClickOnce = () => {
    return setMarker({});
  };
  const handleDoubleClick = (e) => {
    if (!allowMarkInside) return 1;
    const newMarker = { x: e.clientX, y: e.nativeEvent.layerY };
    setMarker(newMarker);

    // console.log(e.nativeEvent.layerY);
  };
  const handleClickMark = () => {
    const newMarker = marker;
    return onClick && onClick(name, image, newMarker.y);
  };
  const handleClearMark = () => {
    return clearMark();
  };
  const handleGoToMark = (y) => {
    return window.scrollTo({ top: y });
  };

  return (
    <div className={cx('readingField')} onClick={handleClickOnce}>
      <div className={cx('main')} onDoubleClick={handleDoubleClick}>
        {Array.isArray(showText) && showText.length > 0 && (
          <div
            className={cx('content')}
            // onLoad={() => console.log('asdasdasd')}
            style={{
              fontFamily: fontWord + ', "Times New Roman",sans-serif',
              fontSize: wordSize / 10 + 'rem',
              lineHeight: wordSize / 10 + 0.4 + 'rem',
              color: pageColor.color && pageColor.color,
              backgroundColor: pageColor.bgColor && pageColor.bgColor,
            }}
            // onMouseDown={() => window.location.reload()}
          >
            <Image src={image}></Image>
            <h1>{name}</h1>
            {showText.map((text, index) => (
              <div key={index} className={cx('line')}>
                {text.map((str, subIndex) => (
                  <span key={subIndex}>{str}</span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {(window.scrollY > oldMarker.y + 500 ||
        window.scrollY < oldMarker.y - 600) && (
        <div className={cx('gotoMark')}>
          <div className={cx('topButton')}>
            <IconButton
              icon={getIcon('faBookmark')}
              size='free'
              round
              onClick={() => handleGoToMark(oldMarker.y)}
            />
          </div>
        </div>
      )}
      {marker.y && (
        <div className={cx('marker')} style={{ top: marker.y, left: marker.x }}>
          <Tippy
            content='Đánh dấu trang tại đây'
            placement='bottom'
            theme='custome'
          >
            <div>
              <IconButton
                icon={getIcon('faBookmark')}
                onClick={handleClickMark}
              />
            </div>
          </Tippy>
        </div>
      )}
      {oldMarker.y && (
        <div
          className={cx('marker', 'marked')}
          style={{ top: oldMarker.y, right: 0 }}
        >
          <Tippy content='Bỏ dấu trang' placement='bottom' theme='custome'>
            <div>
              <IconButton
                icon={getIcon('faBookmark')}
                onClick={handleClearMark}
              />
            </div>
          </Tippy>
        </div>
      )}
    </div>
  );
}

export default ReadField;
