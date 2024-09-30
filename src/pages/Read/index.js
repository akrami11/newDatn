import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import styles from './Read.module.scss';
import { getRead } from '~/assets/content/getDataStorage';

import request from '~/utils/request';
import LightNovel from '~/assets/db/tables/lightnovel';
// import Field from '~/components/Fields';
import images from '~/assets/images';
import IconButton from '~/components/Button/IconButton';
import TextButton from '~/components/Button/TextButton';
import Popup from '~/components/PopupComponent';
import Log from '~/components/LogMessage';
// import Image from '~/components/Image';
// import Input from '~/components/Input';
// import EditableInput from '~/components/EditableInput';
import { Comments as FbComments } from '~/components/_FbPlugin';
import Comments from '~/components/Comments';
import ReadField from './ReadField';
// import Comments from '~/components/_FbPlugin/Comments';
// import Like from '~/components/_FbPlugin/Like';
import {
  //  getTag, getPrice,
  getIcon,
} from '~/assets/content';

const BgColor = [
  {
    id: '1',
    name: 'color1',
    bgColor: 'white',
  },
  {
    id: '2',
    name: 'color2',
    bgColor: 'rgb(230, 230, 230)',
  },
  {
    id: '3',
    name: 'color3',
    color: 'rgb(250, 250, 250)',
    bgColor: 'rgb(100, 100, 100)',
  },
  {
    id: '4',
    name: 'color4',
    color: 'rgb(220, 220, 220)',
    bgColor: 'rgb(50, 50, 50)',
  },
  {
    id: '5',
    name: 'color5',
    color: 'rgb(200, 200, 200)',
    bgColor: 'rgb(0, 5, 10)',
  },
];
const FontWord = [
  {
    id: '1',
    name: 'Chivo',
  },

  {
    id: '2',
    name: 'Arial',
  },

  {
    id: '3',
    name: 'Times New Roman',
  },

  {
    id: '4',
    name: 'Tahoma',
  },
];

const getMark = (id, chapter, name, image, y) => {
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
      if (y >= 0) {
        let newBookmark = bookmark;
        newBookmark.splice(newIndex, 1);
        newBookmark.push({ LID: id, chapter: chapter, name, image, y: y });
        return newBookmark;
      } else if (y === -1) {
        return bookmark[newIndex];
      } else if (y === -2) {
        let newBookmark = bookmark;
        newBookmark.splice(newIndex, 1);
        return newBookmark;
      }
    } else if (y >= 0) {
      let newBookmark = bookmark;
      newBookmark.push({ LID: id, chapter: chapter, name, image, y: y });
      return newBookmark;
    } else if (y === -1) {
      return {};
    } else if (y === -2) {
      return bookmark;
    }

    return newIndex;
  }
  return -1;
};

// const cncn = [
//   { ID: 1, ChapterID: 1 },
//   { ID: 2, ChapterID: 2 },
//   { ID: 3, ChapterID: 3 },
//   { ID: 4, ChapterID: 4 },
// ];

// console.log('mark :', getMark(2, 2));
// const setMember = () => {
//   if (localStorage.getItem('member')) {
//     return JSON.parse(localStorage.getItem('member'));
//   }
//   if (sessionStorage.getItem('member')) {
//     return JSON.parse(sessionStorage.getItem('member'));
//   }
//   return {
//     name: 'Nguyễn Quang Nam',
//     image: images.noImage,
//   };
// };

const cx = classNames.bind(styles);
function Read({ logginDetails, lightNovel, books, reading, setReading }) {
  console.log('readddd : ', lightNovel);
  // params
  const { ID, ChapterID } = useParams();

  // //user :
  // const [user] = useState(setMember());

  //chapter :
  const [newID, setNewID] = useState(ID);
  const [newChapterID, setNewChapterID] = useState(ChapterID);
  const [lightNovelDetail, setLightNovelDetail] = useState([]);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrollingTo, setScrollingTo] = useState(0);
  const [hasSaveBookmark, setSaveBookmark] = useState(
    getMark(ID, ChapterID, '', '', -3) >= 0
  );
  const [hasOpenMessageLog, setOpenMessageLog] = useState('');
  //setting page :
  const [hasOpenSettingPanel, setOpenSettingPanel] = useState(false);
  const [wordSize, setWordSize] = useState(
    localStorage.getItem('size') ? Number(localStorage.getItem('size')) : 14
  );
  const [fontWord, setFontWord] = useState(
    localStorage.getItem('font') ? localStorage.getItem('font') : 'Chivo'
  );
  const [pageColor, setPageColor] = useState(
    localStorage.getItem('color')
      ? JSON.parse(localStorage.getItem('color'))
      : {}
  );
  const [allowMarkInside, hasAllowMarkInside] = useState(
    localStorage.getItem('comment')
      ? localStorage.getItem('comment') === 'true'
        ? true
        : false
      : true
  );
  const [allowShowComment, hasAllowShowComment] = useState(
    localStorage.getItem('markInside')
      ? localStorage.getItem('markInside') === 'true'
        ? true
        : false
      : true
  );

  //follow :
  const [follow, setFollow] = useState(false);
  const [hasClickFollow, setClickFollow] = useState(false);
  //log :
  const [undo, setUndo] = useState(false);
  //comment :
  const [hasViewFbComment, setViewFbComment] = useState(false);
  const [fbCommentWidth, setFbCommentWidth] = useState(0);
  // // fb :
  const [dataHref, setNewDataHref] = useState(
    process.env.REACT_APP_LIVE_URL +
      'lightNovel/?id=' +
      newID +
      '&chapter=' +
      newChapterID
  );
  const [dataLocal] = useState('vi_VN');

  // useNavigate :
  const navigate = useNavigate();

  //useRef :
  const fbRef = useRef();

  //useEffect :

  useEffect(() => {
    setNewID(ID);
    setNewChapterID(ChapterID);
    setSaveBookmark(getMark(ID, ChapterID, '', '', -3) >= 0);
    return () => setShowHeader(true);
  }, [ID, ChapterID]);

  useEffect(() => {
    setNewDataHref(
      process.env.REACT_APP_LIVE_URL +
        'lightNovel/?id=' +
        newID +
        '&chapter=' +
        newChapterID
    );
  }, [newID, newChapterID]);

  // follow :
  useEffect(() => {
    if (Array.isArray(logginDetails.follow)) {
      const book = getData(books, newID);
      if (book && book.ID && checkFollow(logginDetails.follow, book.ID) >= 0) {
        return setFollow(true);
      }
    }
    return;
  }, [logginDetails, books, newID]);
  useEffect(() => {
    if (hasClickFollow) {
      if (Array.isArray(logginDetails.follow)) {
        const book = getData(books, newID);
        var newFollow = logginDetails.follow;
        if (checkFollow(logginDetails.follow, book.ID) >= 0) {
          newFollow.splice(checkFollow(logginDetails.follow, book.ID), 1);
          setFollow(false);
        } else {
          newFollow.push({
            ID: book.ID,
            name: book.name,
            image: book.image,
          });
          setFollow(true);
        }
        logginDetails.setFollow(newFollow);
        delete logginDetails.image;
        console.log(logginDetails);
        logginDetails.update();
      }
    }
    return () => setClickFollow(false);
  }, [logginDetails, books, newID, hasClickFollow]);

  // set fbcomment
  useEffect(() => {
    if (hasViewFbComment) {
      if (fbRef.current.clientWidth) {
        setFbCommentWidth(Math.ceil(fbRef.current.clientWidth * 0.95));
      }
    }
  }, [fbRef, hasViewFbComment]);
  // get ln :
  useEffect(() => {
    if (ID && lightNovelDetail.length === 0) {
      request
        .get('lightnovel/getLightNovel/' + ID)
        .then((res) => {
          const response = res.data.map((ln) => new LightNovel(ln));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          setShowHeader(true);

          setLightNovelDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });

  //scroll :
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowGoToTop(true);
      } else setShowGoToTop(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollingTo) {
        setScrollingTo(window.scrollY);
        setShowHeader(false);
      } else {
        if (scrollingTo - window.scrollY > 200) {
          setShowHeader(true);
          setScrollingTo(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollingTo]);

  const handleGoToTop = () => {
    return window.scrollTo({ top: 0 });
  };
  const handleReadBook = () => {
    if (books) {
      const book = getData(books, newID);
      book &&
        book.name &&
        localStorage.setItem(
          'read',
          JSON.stringify(getRead(newID, newChapterID, book.name, book.image))
        );
    }
    return;
  };
  const handleSelectChapterID = (e) => {
    return navigate('/read/' + newID + '/chapter/' + e);
  };
  const handleClickPrev = (index) => {
    setShowHeader(false);
    return navigate(
      '/read/' + newID + '/chapter/' + lightNovelDetail[index].chapter
    );
  };
  const handleClickNext = (index) => {
    setShowHeader(false);
    return navigate(
      '/read/' + newID + '/chapter/' + lightNovelDetail[index].chapter
    );
  };
  const handleClickFollow = () => {
    setClickFollow(true);
  };
  const handleClickSaveBookmark = (lightNovel) => {
    if (!hasSaveBookmark) {
      const newMark = getMark(
        newID,
        newChapterID,
        lightNovel.name,
        lightNovel.image,
        0
      );
      setSaveBookmark(true);
      setOpenMessageLog('Đánh dấu ');
      setUndo(false);
      return localStorage.setItem('bookmark', JSON.stringify(newMark));
    }
    const demake = getMark(newID, newChapterID, '', '', -2);
    setSaveBookmark(false);
    setOpenMessageLog('Bỏ dấu ');
    setUndo(true);
    return localStorage.setItem('bookmark', JSON.stringify(demake));
  };
  const handleClickSettingPage = () => {
    return setOpenSettingPanel(true);
  };
  const handleCloseBox = () => {
    localStorage.setItem('size', wordSize);
    localStorage.setItem('font', fontWord);
    localStorage.setItem('comment', allowShowComment);
    localStorage.setItem('markInside', allowMarkInside);
    localStorage.setItem('color', JSON.stringify(pageColor));
    // console.log(wordSize, fontWord, pageColor);
    return setOpenSettingPanel(false);
  };
  const handleResetSettingPanel = () => {
    setWordSize(14);
    setFontWord('Chivo');
    setPageColor({});
    setOpenMessageLog('Đặt lại ');
  };
  const handleClickSelector = (e) => {
    return setViewFbComment(e);
  };
  const handleChooseColor = (color) => {
    setPageColor(color);
    // return console.log(color);
  };
  const handleSelectFont = (e) => {
    return setFontWord(e);
  };
  const handleChangeSize = (e) => {
    if (e === '+') {
      if (wordSize < 30) {
        return setWordSize(wordSize + 1);
      }
    }
    if (e === '-') {
      if (wordSize > 10) {
        return setWordSize(wordSize - 1);
      }
    }
  };
  const handleAllowMarkInside = () => {
    return hasAllowMarkInside(!allowMarkInside);
  };
  const handleAllowComment = () => {
    return hasAllowShowComment(!allowShowComment);
  };
  const handleMarkInside = (name, image, y) => {
    setSaveBookmark(true);
    setOpenMessageLog('Đánh dấu ');
    setUndo(false);
    return localStorage.setItem(
      'bookmark',
      JSON.stringify(getMark(newID, newChapterID, name, image, y))
    );
  };
  const handleClearMark = () => {
    setOpenMessageLog('Bỏ dấu ');
    setUndo(true);

    return localStorage.setItem(
      'bookmark',
      JSON.stringify(getMark(newID, newChapterID, '', '', -2))
    );
  };
  const getData = (array, id) => {
    if (Array.isArray(array)) {
      const index = array.findIndex((val) => val.getData(id));
      return array[index];
    }
    return {};
  };

  const checkFollow = (arr, id) => {
    if (Array.isArray(arr)) {
      if (arr.length > 0) {
        const index = arr.findIndex((val) => val.ID === id);
        return index;
      }
    }
    return -1;
  };
  return (
    <div className={cx('wrapper')}>
      {Array.isArray(lightNovelDetail) &&
        lightNovelDetail.map((lightNovel, index) => {
          if (ChapterID === lightNovel.chapter)
            return (
              <div className={cx('readingField')} key={index}>
                {showHeader && (
                  <div className={cx('header')}>
                    <div className={cx('topHeader')}>
                      <div className={cx('headButton')}>
                        <div className={cx('left')}>
                          <div className={cx('button')}>
                            <IconButton
                              icon={getIcon('faHome')}
                              onClick={() => navigate('/')}
                            />
                          </div>
                          <div className={cx('button')}>
                            <IconButton
                              icon={getIcon('faList')}
                              onClick={() => navigate('./../../')}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={cx('chapter')}>
                        <div className={cx('chapterButton')}>
                          <IconButton
                            icon={getIcon('faChevronLeft')}
                            hover
                            size='free'
                            type={
                              index === lightNovelDetail.length - 1
                                ? 'disable'
                                : 'danger'
                            }
                            onClick={() => {
                              if (index !== lightNovelDetail.length - 1)
                                handleClickNext(index + 1);
                            }}
                          />
                        </div>
                        {Array.isArray(lightNovelDetail) && (
                          <select
                            defaultValue={ChapterID}
                            className={cx('chapterSelect')}
                            onChange={(e) =>
                              handleSelectChapterID(e.target.value)
                            }
                          >
                            {lightNovelDetail.length > 0 &&
                              lightNovelDetail.map((data, index) => (
                                <option value={data.chapter} key={index}>
                                  {data.name}
                                </option>
                              ))}
                          </select>
                        )}
                        <div className={cx('chapterButton')}>
                          <IconButton
                            icon={getIcon('faChevronRight')}
                            hover
                            size='free'
                            type={index === 0 ? 'disable' : 'danger'}
                            onClick={() => {
                              if (index !== 0) handleClickPrev(index - 1);
                            }}
                          />
                        </div>
                      </div>
                      <div className={cx('headButton')}>
                        <div className={cx('button')}>
                          <TextButton
                            type={follow ? 'danger' : 'success'}
                            size='fit'
                            radius
                            onClick={handleClickFollow}
                          >
                            {follow ? 'Bỏ theo dõi' : 'Theo dõi'}
                          </TextButton>
                        </div>
                        <div className={cx('right')}>
                          <div
                            onClick={() => handleClickSaveBookmark(lightNovel)}
                            className={cx(
                              'button',
                              hasSaveBookmark && 'marked'
                            )}
                          >
                            <IconButton icon={getIcon('faBookmark')} />
                          </div>
                          <div
                            onClick={handleClickSettingPage}
                            className={cx('button')}
                          >
                            <IconButton icon={getIcon('faGear')} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <ReadField
                  file={lightNovel.file}
                  wordSize={wordSize}
                  fontWord={fontWord}
                  pageColor={pageColor}
                  lightNovel={lightNovel}
                  allowMarkInside={allowMarkInside}
                  onRead={handleReadBook}
                  onClick={handleMarkInside}
                  clearMark={handleClearMark}
                  ID={newID}
                  chapterID={newChapterID}
                  name={lightNovel.name}
                  image={lightNovel.image}
                ></ReadField>

                {allowShowComment && (
                  <div className={cx('main')}>
                    <div className={cx('commentField')} ref={fbRef}>
                      <div className={cx('comments')}>
                        <div className={cx('commentSelector')}>
                          <div
                            className={cx(
                              'commentButton',
                              !hasViewFbComment && 'selected'
                            )}
                          >
                            <TextButton
                              size={'large'}
                              hover
                              onClick={() => handleClickSelector(false)}
                            >
                              Thảo luận page
                            </TextButton>
                          </div>
                          <div
                            className={cx(
                              'commentButton',
                              hasViewFbComment && 'selected'
                            )}
                          >
                            <TextButton
                              size={'large'}
                              hover
                              onClick={() => handleClickSelector(true)}
                            >
                              Facebook
                            </TextButton>
                          </div>
                        </div>
                        {!hasViewFbComment && (
                          <div className={cx('pageComment')}>
                            <Comments
                              book={lightNovel}
                              LID={newID}
                              chapter={newChapterID}
                            ></Comments>
                          </div>
                        )}
                        {hasViewFbComment && (
                          <div className={cx('fbComment')}>
                            <FbComments
                              dataHref={dataHref}
                              dataLocal={dataLocal}
                              dataWitdh={fbCommentWidth}
                            ></FbComments>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          else return <div key={index}></div>;
        })}
      {/* <div className={cx('aaaa')}>
        Truyện liên quan :
        <Field datas={newdddd} />
      </div> */}
      {showGoToTop && (
        <div className={cx('footer')}>
          <div className={cx('topButton')}>
            <IconButton
              icon={getIcon('faChevronUp')}
              size='free'
              round
              onClick={handleGoToTop}
            />
          </div>
        </div>
      )}
      {/* popup component */}
      {hasOpenSettingPanel && (
        <Popup onClick={handleCloseBox} noBackground>
          <div className={cx('settingBox')}>
            <div className={cx('titleBox')}>
              Tùy chỉnh
              <TextButton
                size='mini'
                type='disable'
                radius
                outline
                onClick={handleResetSettingPanel}
              >
                Đặt lại
              </TextButton>
            </div>
            <div className={cx('setColor')}>
              <div className={cx('title')}>Màu nền</div>
              <div className={cx('mainBox')}>
                {BgColor.map((cl, index) => (
                  <div
                    key={index}
                    className={cx('previewColor', cl.name)}
                    onClick={() => handleChooseColor(cl)}
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>
            <div className={cx('setFont')}>
              <div className={cx('title')}>Font chữ</div>
              <select
                defaultValue={fontWord}
                className={cx('selectFont')}
                onChange={(e) => handleSelectFont(e.target.value)}
                // onChange={(e) => handleSelectChapterID(e.target.value)}
              >
                {FontWord.map((data, index) => (
                  <option value={data.name} key={index}>
                    {data.name === 'Chivo' ? 'Mặc định' : data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx('setSize')}>
              <div className={cx('title')}>Cỡ chữ</div>
              <div className={cx('mainBox')}>
                <IconButton
                  type={wordSize > 10 ? 'success' : 'disable'}
                  icon={getIcon('faChevronLeft')}
                  size='mini'
                  noBackground
                  onClick={() => handleChangeSize('-')}
                ></IconButton>
                <div
                  className={cx('viewSize')}
                  style={{ fontSize: wordSize / 10 + 'rem' }}
                >
                  {wordSize / 10} rem
                </div>
                <IconButton
                  type={wordSize < 30 ? 'success' : 'disable'}
                  icon={getIcon('faChevronRight')}
                  size='mini'
                  noBackground
                  onClick={() => handleChangeSize('+')}
                ></IconButton>
              </div>
            </div>
            <div>
              <div className={cx('title')}>Chức năng</div>
              <div className={cx('mainBox')}>
                <div className={cx('checkBox')}>
                  <input
                    type='checkbox'
                    id={'inpAllowMarkInside'}
                    defaultChecked={allowMarkInside}
                    onClick={handleAllowMarkInside}
                  />
                  <label htmlFor='inpAllowMarkInside'>
                    Đánh dấu trong truyện
                  </label>
                </div>
              </div>
              <div className={cx('mainBox')}>
                <div className={cx('checkBox')}>
                  <input
                    type='checkbox'
                    id={'inpComment'}
                    defaultChecked={allowShowComment}
                    onClick={handleAllowComment}
                  />
                  <label htmlFor='inpComment'>Tham gia thảo luận</label>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
      {hasOpenMessageLog && (
        <Log
          act={hasOpenMessageLog}
          onAutoClose={() => {
            setOpenMessageLog('');
            setUndo(false);
          }}
          undo={undo}
          status={true}
        />
      )}
    </div>
  );
}

export default Read;
