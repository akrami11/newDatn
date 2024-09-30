import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './LightNovel.module.scss';
import request from '~/utils/request';
// import images from '~/assets/images';
import { getTimeDetail } from '~/assets/content';
import { getRead } from '~/assets/content/getDataStorage';
// import part1 from '~/assets/lightnovel/test.txt';

import LN from '~/assets/db/tables/lightnovel.js';
import Comments from '~/components/Comments';
// import Product from '~/assets/db/tables/product.js';

import LightNovelList from 'src/components/ListLightNovel';
import Popup from '~/components/PopupComponent';
import AddBox from '~/components/AddLightNovel';
import Image from '~/components/Image';
import TextButton from '~/components/Button/TextButton';
import Tag from '~/components/Tag';
import { Like, Comments as FbComments } from '~/components/_FbPlugin';

const getData = (array, id) => {
  if (Array.isArray(array)) {
    const index = array.findIndex((val) => val.getData(id));
    return array[index];
  }
  return {};
};

const cx = classNames.bind(styles);
function LightNovel({ books, lightNovel, item, itemID, logginDetails }) {
  // console.log('read : ', books);
  const { ID } = useParams();
  const [newID, setNewID] = useState();
  // const [newID, setNewID] = useState(ID);
  const [bookDetail, setBookDetail] = useState({});
  const [series, setSeries] = useState([]);
  const [lightNovelDetail, setLightNovelDetail] = useState([]);
  const [lastRead] = useState(getRead(ID) || []);
  const [visited] = useState(getRead(ID).visited || []);
  const [hasGetLN, setGetLN] = useState(false);
  const [hasReset, setReset] = useState(false);
  // console.log(buy);
  // const [contentPart1, setPart1] = useState('');

  //follow :
  const [follow, setFollow] = useState(false);
  const [loggedDetails, setLoggedDetails] = useState({});
  const [hasClickFollow, setClickFollow] = useState(false);
  //add new record :
  const [addNewRecord, setAddRecord] = useState(false);

  //comment :
  const [hasViewFbComment, setViewFbComment] = useState(false);
  const [fbCommentWidth, setFbCommentWidth] = useState(0);
  // // fb :
  const [dataHref, setNewDataHref] = useState(
    process.env.REACT_APP_LIVE_URL + 'read/' + ID
  );
  const [dataLocal] = useState('vi_VN');
  const fbRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (ID) {
      setNewID(ID);
      setLightNovelDetail([]);
      setReset(true);
    }
  }, [ID]);
  useEffect(() => {
    if (logginDetails) {
      if (logginDetails.ID) {
        if (
          bookDetail &&
          bookDetail.ID &&
          checkFollow(logginDetails.follow, bookDetail.ID) >= 0
        ) {
          setFollow(true);
        }
        return setLoggedDetails(logginDetails);
      }
    }
  }, [logginDetails, bookDetail]);
  useEffect(() => {
    // setNewID(ID);
    setNewDataHref(process.env.REACT_APP_LIVE_URL + 'read/' + ID);
    // setNewChapterID(ChapterID);
    // setSaveBookmark(getMark(ID, ChapterID) >= 0);
  }, [ID]);

  // console.log(contentPart1);
  // useEffect(() => {
  //   if (!bookDetail.ID) {
  //     request
  //       .get('product/getOne/' + ID)
  //       .then((res) => {
  //         const newRequest = new Product(res.data);
  //         if (!newRequest.image) {
  //           newRequest.setImage(images.noImage);
  //         } else
  //           newRequest.setImage(
  //             'http://localhost:3001/public/' + newRequest.image
  //           );
  //         setBookDetail(newRequest);
  //       })
  //       .catch(() => console.log('false'));
  //   }
  // });
  useEffect(() => {
    if (!hasGetLN && bookDetail && bookDetail.LID && !lightNovelDetail.length) {
      request
        .get('lightnovel/getLightNovel/' + bookDetail.LID)
        .then((res) => {
          const newRequest = res.data.map((ln) => new LN(ln));
          // console.log(newRequest);
          setGetLN(true);
          setLightNovelDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  }, [bookDetail, lightNovelDetail, hasGetLN]);
  useEffect(() => {
    if (hasReset && bookDetail && bookDetail.LID) {
      request
        .get('lightnovel/getLightNovel/' + bookDetail.LID)
        .then((res) => {
          const newRequest = res.data.map((ln) => new LN(ln));
          console.log(newRequest);
          setReset(false);
          setLightNovelDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  }, [hasReset, bookDetail]);
  useEffect(() => {
    if (books && Array.isArray(books) && books.length) {
      if (item) {
        const newIndex = books.findIndex((book) => book.LID === itemID);
        return setBookDetail(books[newIndex]);
      }
      setBookDetail(getData(books, newID));
    }
    return;
  }, [books, newID, item, itemID]);
  useEffect(() => {
    if (!series.length) {
      if (bookDetail && bookDetail.series) {
        if (Array.isArray(books) && books.length) {
          const newBooks = books;
          newBooks.map(
            (book) =>
              book &&
              bookDetail &&
              book.series === bookDetail.series &&
              setSeries((pre) => [...pre, book])
          );
        }
      }
    }
    return;
  }, [series, bookDetail, books]);
  // useEffect(() => {
  //   if (bookDetail.LID) {
  //     if (!hasGetNovel) {
  //       if (Array.isArray(lightNovel) && lightNovel.length) {
  //         lightNovel.map(
  //           (val) =>
  //             val.getData(bookDetail.LID) &&
  //             setLightNovelDetail((preData) => [val, ...preData])
  //         );
  //         return setGetNovel(true);
  //       }
  //     }
  //   }
  //   return;
  // }, [lightNovel, bookDetail, hasGetNovel]);
  useEffect(() => {
    if (lightNovelDetail && lightNovelDetail.length > 0) {
      if (bookDetail && bookDetail.LID && !item) {
        const newViews = lightNovelDetail.map((ln) => ln.views);
        const viewsCount = newViews.reduce((total, num) => total + num);
        // console.log(viewsCount, bookDetail);
        bookDetail.addViews(viewsCount);
      }
    }
  });

  useEffect(() => {
    if (hasViewFbComment) {
      if (fbRef.current.clientWidth) {
        // console.log(Math.ceil(fbRef.current.clientWidth * 0.95));
        // console.log(fbRef.current.clientWidth, fbRef.current.clientHeight);
        setFbCommentWidth(Math.ceil(fbRef.current.clientWidth * 0.95));
      }
    }
  }, [fbRef, hasViewFbComment]);

  //follow :
  useEffect(() => {
    if (hasClickFollow) {
      var newFollow = loggedDetails.follow;
      if (checkFollow(loggedDetails.follow, bookDetail.ID) >= 0) {
        newFollow.splice(checkFollow(loggedDetails.follow, bookDetail.ID), 1);
        setFollow(false);
      } else {
        newFollow.push({
          ID: bookDetail.ID,
          name: bookDetail.name,
          image: bookDetail.image,
        });
        setFollow(true);
      }
      loggedDetails.setFollow(newFollow);
      delete loggedDetails.image;
      console.log(loggedDetails);
      loggedDetails.update();
    }
    return () => setClickFollow(false);
  }, [bookDetail, hasClickFollow, loggedDetails]);

  const handleClickSelector = (e) => {
    return setViewFbComment(e);
  };
  const handleClickLightNovel = (chapter) => {
    localStorage.setItem(
      'read',
      JSON.stringify(getRead(ID, chapter, bookDetail.name, bookDetail.image))
    );
    return navigate('./chapter/' + chapter);
  };

  const handleClickCopy = (e) => {
    return navigator.clipboard.writeText(e);
  };

  const handleClickFollow = () => {
    setClickFollow(true);

    // console.log('handleClickFollow', follow);
  };
  const handleClickReadFirst = () => {
    if (item) {
      return navigate(
        '/read/' +
          bookDetail.ID +
          '/chapter/' +
          lightNovelDetail[lightNovelDetail.length - 1].chapter
      );
    } else
      return navigate(
        'chapter/' + lightNovelDetail[lightNovelDetail.length - 1].chapter
      );
  };
  const handleClickReadLast = () => {
    if (item) {
      return navigate(
        '/read/' + bookDetail.ID + '/chapter/' + lightNovelDetail[0].chapter
      );
    } else return navigate('chapter/' + lightNovelDetail[0].chapter);
  };

  const handleAddChapter = () => {
    return setAddRecord(true);
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
  const handleReset = () => {
    setReset(true);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('details')}>
        <div className={cx('main', item && 'itemPreview')}>
          <div className={cx('image')}>
            <Image src={bookDetail && bookDetail.image} size={'normal'} />
          </div>
          {bookDetail && (
            <div className={cx('props')}>
              <div className={cx('title')}>{bookDetail && bookDetail.name}</div>
              <div className={cx('tag')}>
                Thể loại :
                {bookDetail &&
                  bookDetail.tag &&
                  Array.isArray(bookDetail.tag) &&
                  bookDetail.tag.map((val, index) => (
                    <Tag value={val} key={index}></Tag>
                  ))}
              </div>

              <div className={cx('description')}>
                Mô tả :{' '}
                {bookDetail && bookDetail.description && bookDetail.description}
              </div>
              <div>
                <Like dataHref={dataHref} dataLocal={dataLocal} />
              </div>
              <div className={cx('description')}>
                Có sẵn sách bản cứng. Đặt mua liên hệ :{' '}
                <Tippy content='Copy' placement='bottom' theme='dark'>
                  <span
                    className={cx('buyDetail')}
                    onClick={() =>
                      handleClickCopy(
                        process.env.REACT_APP_PHONE_NUMBER || '0395118914'
                      )
                    }
                  >
                    {process.env.REACT_APP_PHONE_NUMBER || '0395118914'}
                  </span>
                </Tippy>{' '}
                hoặc email :{' '}
                <Tippy content='Copy' placement='bottom' theme='dark'>
                  <span
                    className={cx('buyDetail')}
                    onClick={() =>
                      handleClickCopy(
                        process.env.REACT_APP_HOST_EMAIL ||
                          'nguyenquangnam03@gmail.com'
                      )
                    }
                  >
                    {process.env.REACT_APP_HOST_EMAIL ||
                      'nguyenquangnam03@gmail.com'}
                  </span>
                </Tippy>{' '}
              </div>
              <div className={cx('description')}>
                Lượt xem : {bookDetail && bookDetail.views && bookDetail.views}
              </div>
              <div className={cx('action')}>
                <TextButton
                  type={follow ? 'danger' : 'success'}
                  size='large'
                  onClick={handleClickFollow}
                  radius
                  margin
                >
                  {follow ? 'Bỏ theo dõi' : 'Theo dõi'}
                </TextButton>
                <div className={cx('button')}>
                  <TextButton
                    type='warning'
                    onClick={handleClickReadFirst}
                    radius
                    margin
                  >
                    Đọc chương đầu
                  </TextButton>
                  <TextButton
                    type='warning'
                    onClick={handleClickReadLast}
                    radius
                    margin
                  >
                    Đọc chương mới nhất
                  </TextButton>
                  {item ||
                    (bookDetail.AuthorID === loggedDetails.ID && (
                      <TextButton
                        type='primary'
                        onClick={handleAddChapter}
                        radius
                        margin
                      >
                        Đăng chương mới
                      </TextButton>
                    ))}
                </div>
              </div>

              {/* <div className={cx('action')}>
              <div className={cx('button')}>
                <TextButton
                  type={'success'}
                  size='large'
                  onClick={handleBuyBook}
                  radius
                  hover
                >
                  Mua ngay
                </TextButton>
              </div>
              <div className={cx('button')}>
                <TextButton
                  type={'primary'}
                  size='large'
                  onClick={handleAddCart}
                  radius
                  hover
                >
                  Thêm giỏ hàng
                </TextButton>
              </div>
              {bookDetail.LID && (
                <div className={cx('button')}>
                  <TextButton
                    type={'info'}
                    size='large'
                    onClick={handleViewLightNovel}
                    radius
                    hover
                  >
                    Đọc online
                  </TextButton>
                </div>
              )}
            </div> */}
            </div>
          )}
        </div>
      </div>

      <div className={cx('bott')}>
        {!item && (
          <div className={cx('listChapter')}>
            <div className={cx('title')}>Danh sách chương</div>
            <div className={cx('chapterBox')}>
              <div className={cx('chapter', 'header')}>
                <div className={cx('nameChapter', 'header')}>Tên chapter</div>
                <div className={cx('headChapterBox', 'header')}>Lượt xem</div>
                <div className={cx('headChapterBox', 'header')}>Cập nhật</div>
              </div>
              {lightNovelDetail.map((ln, index) => {
                const readChapter =
                  visited.findIndex((chap) => chap === ln.chapter) >= 0
                    ? 'visited'
                    : '';
                const lastReadChapter =
                  lastRead.chapter === ln.chapter ? 'lastReadChapter' : '';
                return (
                  <div
                    key={index}
                    className={cx('chapter')}
                    onClick={() => handleClickLightNovel(ln.chapter)}
                  >
                    <span
                      className={cx(
                        'nameChapter',
                        readChapter,
                        lastReadChapter
                      )}
                    >
                      Chap {ln.chapter}{' '}
                    </span>
                    <span className={cx('views')}>{ln.views}</span>
                    <span className={cx('timer')}>
                      {getTimeDetail(ln.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!item && series.length > 0 && (
          <div className={cx('others')}>
            <LightNovelList
              title='Truyện cùng series :'
              list={series}
              series
              lightNovel={lightNovel}
            ></LightNovelList>
          </div>
        )}
      </div>
      {!item && (
        <div className={cx('commentField')} ref={fbRef}>
          <div className={cx('comments')}>
            <div className={cx('commentSelector')}>
              <div
                className={cx('commentButton', !hasViewFbComment && 'selected')}
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
                className={cx('commentButton', hasViewFbComment && 'selected')}
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
                <Comments book={bookDetail} LID={ID}></Comments>
              </div>
            )}
            {hasViewFbComment && (
              <div className={cx('fbComment')}>
                {/* <div
                  className='fb-comments'
                  data-href={dataHref}
                  data-width={'600'}
                  data-order-by='time'
                  data-numposts='5'
                  data-lazy='true'
                ></div> */}
                <FbComments
                  dataHref={dataHref}
                  dataLocal={dataLocal}
                  dataWitdh={fbCommentWidth}
                ></FbComments>
              </div>
            )}
          </div>
        </div>
      )}
      {addNewRecord && (
        <Popup onClick={() => setAddRecord(false)}>
          <AddBox
            books={books}
            lightNovelDetail={lightNovelDetail}
            logginDetails={logginDetails}
            bookDetail={bookDetail}
            onCloseBox={() => setAddRecord(false)}
            onReset={handleReset}
          ></AddBox>
        </Popup>
      )}
    </div>
  );
}

export default LightNovel;
