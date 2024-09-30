import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';

import Header from './Header';
import Sidebar from './Sidebar';
import request from '~/utils/request';
import images from '~/assets/images';
import User from '~/assets/db/tables/user.js';
import Product from '~/assets/db/tables/product.js';
import LightNovel from '~/assets/db/tables/lightnovel.js';
import Customer from '~/assets/db/tables/customer.js';

const cx = classNames.bind(styles);

const setUnique = (arr) => {
  if (Array.isArray(arr)) {
    var unique = arr.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    return unique;
  }
  return [];
};

function DefaultLayout({ children }) {
  const ChildComp = children.type;
  const { ChapterID } = useParams();
  //check login
  const [login, setLogin] = useState(
    localStorage.getItem('login')
      ? JSON.parse(localStorage.getItem('login'))
      : {}
  );
  const [checkLogin, setCheckLogin] = useState(false);
  const [logginDetails, setLogginDetails] = useState({});
  //check notice :
  const [notification, setNotification] = useState(false);
  const [clickNotify, setNotify] = useState(false);

  // search :
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState();
  const [searchByName, setSearchByName] = useState('');
  const [searchByAuthor, setSearchByAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [lightNovel, setLightNovel] = useState([]);

  // check page = read ? :
  const [isReading, setReading] = useState(false);
  //history :
  const [storageHistory, setStorageHistory] = useState([]);
  // follow:
  const [hasGetFollow, setGetNewFollow] = useState(false);
  const [newFollow, setNewFollow] = useState([]);

  const navigate = useNavigate();

  // get history
  useEffect(() => {
    if (localStorage.getItem('read')) {
      const newHistory = JSON.parse(localStorage.getItem('read'));
      // console.log('newHistory : ', newHistory);
      setStorageHistory(newHistory);
    }
  }, []);
  // get follow
  useEffect(() => {
    if (
      Array.isArray(books) &&
      books.length &&
      logginDetails &&
      Array.isArray(logginDetails.follow) &&
      logginDetails.follow.length
    ) {
      if (!hasGetFollow) {
        if (!newFollow.length) {
          const newArray = logginDetails.follow.map((ln) => ln.ID);
          // console.log(setUnique(newArray));
          setUnique(newArray).map((arr) => {
            const newIndex = books.findIndex((book) => arr === book.ID);
            books[newIndex] && setNewFollow((pre) => [...pre, books[newIndex]]);
            return 1;
          });
        }
        return setGetNewFollow(false);
      }
    }
  }, [logginDetails, hasGetFollow, books, newFollow]);

  useEffect(() => {
    if (searchByAuthor) {
      setSearchByName('');
    }
  }, [searchByAuthor]);
  useEffect(() => {
    if (searchByName) {
      setSearchByAuthor('');
    }
  }, [searchByName]);
  useEffect(() => {
    if (!checkLogin && login.ID) {
      request
        .post('login', { AID: login.ID })
        .then((res) => {
          // console.log('req : ', res.data);
          if (res.data === null) {
            return navigate('/login');
          }
          setCheckLogin(true);
          return setLogin(res.data);
        })
        .catch(() => {
          // console.log('fail');
          return navigate('/login');
        });
    }
  }, [checkLogin, navigate, login]);
  useEffect(() => {
    if (!logginDetails.ID) {
      if (login.ID) {
        if (login.level < 3) {
          request
            .get('user/getOne/' + login.ID)
            .then((res) => {
              const req = new User(res.data);
              if (!req.image) {
                req.setImage(images.noImage);
              } else req.setImage('http://localhost:3001/public/' + req.image);
              // console.log(req);
              req.setLevel(login.level);
              setLogginDetails(req);
            })
            .catch(() => {
              return console.log('Không tìm thấy thông tin đăng nhập');
            });
        } else {
          request
            .get('customer/getOne/' + login.ID)
            .then((res) => {
              const req = new Customer(res.data);
              if (!req.image) {
                req.setImage(images.noImage);
              } else req.setImage('http://localhost:3001/public/' + req.image);
              req.setLevel(login.level);
              setLogginDetails(req);
            })
            .catch(() => {
              return console.log('Không tìm thấy thông tin đăng nhập');
            });
        }
      }
    }
  });

  // get all book and ln :
  //// book
  useEffect(() => {
    if (!books.length) {
      request
        .get('product/')
        .then((res) => {
          const response = res.data.map((dt) => new Product(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setBooks(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });
  //// light novel :
  useEffect(() => {
    if (!lightNovel.length) {
      request
        .get('lightnovel/')
        .then((res) => {
          const response = res.data.map((dt) => new LightNovel(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setLightNovel(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });

  //notification :
  useEffect(() => {
    if (clickNotify) {
      setNotification(true);
      setNotify(false);
    }
    return () => setNotification(false);
  }, [clickNotify]);

  useEffect(() => {
    if (ChapterID) {
      setReading(true);
    } else setReading(false);
  }, [ChapterID]);

  const handleClickAct = () => {
    return setNotify(true);
  };
  const handleSearchByTypes = (categories, type) => {
    setCategories(categories);
    setType(type);
  };
  const handleSearchedByName = (value) => {
    setSearchByName(value);
  };
  const handleSearchedByAuthor = (value) => {
    setSearchByAuthor(value);
  };
  return (
    <div className={cx('wrapper', 'light')}>
      <Header
        logginDetails={logginDetails}
        notify={notification}
        onSearchByTypes={handleSearchByTypes}
        onSearchedByName={handleSearchedByName}
        onSearchedByAuthor={handleSearchedByAuthor}
        reading={isReading}
        books={books}
      />
      <div className={cx('container')}>
        {!isReading && <Sidebar />}
        <div className={cx('main', isReading && 'fullScreen')}>
          <ChildComp
            refreshNotification={handleClickAct}
            categories={categories}
            searchByName={searchByName}
            searchByAuthor={searchByAuthor}
            type={type}
            books={books}
            lightNovel={lightNovel}
            logginDetails={logginDetails}
            history={storageHistory}
            follow={newFollow}
          />
        </div>
        {!isReading && <Sidebar />}
      </div>
      <footer className={cx('footer', isReading && 'reading')}>
        <span> Nhà sách Nguyễn Nam by NGUYEN QUANG NAM. </span>{' '}
        <span>
          Phone: {process.env.REACT_APP_PHONE_NUMBER}. Email:{' '}
          {process.env.REACT_APP_HOST_EMAIL}. Địa chỉ : 55 Giải Phóng, Đồng tâm,
          Hai Bà Trưng, Hà Nội
        </span>
      </footer>
    </div>
  );
}

export default DefaultLayout;
