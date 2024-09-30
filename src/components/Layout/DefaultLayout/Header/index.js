import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';

import NavList from '~/components/NavList';
import Image from '~/components/Image';
// import IconButton from '~/components/Button/IconButton';
import Search from '~/components/Search';
import images from '~/assets/images';
import Popup from '~/components/PopupComponent';
// import Input from '~/components/Input';
// import Cart from '~/components/Cart';
import BookTypes from '~/components/BookTypes/index.js';
import styles from './Header.module.scss';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import AddBox from '~/components/AddLightNovel';
import request from '~/utils/request';
import User from '~/assets/db/tables/user.js';
import Customer from '~/assets/db/tables/customer.js';
import ObjectDetails from '~/components/ObjectDetails';
// import Product from '~/assets/db/tables/product.js';
// import LightNovel from '~/assets/db/tables/lightnovel.js';
// import Product from '~/assets/db/tables/product.js';

const cx = classNames.bind(styles);

function Header({
  logginDetails,
  notify,
  onSearchByTypes,
  onSearchedByName,
  onSearchedByAuthor,
  books,
  reading,
}) {
  const [newLoginDetails, setNewLoginDetails] = useState({});
  // const [notification, setNotification] = useState(0);
  // const [hasOpenCart, setOpenCart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  // const [isReading, setReading] = useState(false);
  // const [bookDetail, setBookDetail] = useState([]);
  const [searchBy, setSearchBy] = useState('0');
  const [searchValue, setSearchValue] = useState('');
  //edit
  const [hasEdit, setEdit] = useState(false);
  const [resetData, setResetData] = useState(false);
  // const [saveStorage] = useState(false);
  const [hasShowEditBox, setShowEditBox] = useState(false);
  const [loggedDetail, setLoggedDetail] = useState(false);

  const [member, setMember] = useState();

  //add new record :
  const [addNewRecord, setAddRecord] = useState(false);
  // const [newData, setNewData] = useState({});

  //use navigate
  const navigate = useNavigate();

  // useEffect()
  useEffect(() => {
    if (logginDetails.ID) {
      console.log('logginDetails : ', logginDetails);
      setNewLoginDetails(logginDetails);
    }
  }, [logginDetails]);
  useEffect(() => {
    if (localStorage.getItem('member')) {
      return setMember(JSON.parse(localStorage.getItem('member')));
    }
    if (sessionStorage.getItem('member')) {
      return setMember(JSON.parse(sessionStorage.getItem('member')));
    }
  }, []);

  useEffect(() => {}, [reading]);

  // edit user :
  useEffect(() => {
    if (resetData) {
      if (member.member === 1) {
        request
          .get('user/getOne/' + newLoginDetails.ID)
          .then((res) => {
            // call back save data
            const req = new User(res.data);
            if (!req.image) {
              req.setImage(images.noImage);
            } else req.setImage('http://localhost:3001/public/' + req.image);

            setLoggedDetail(req);
            setEdit(false);
            setResetData(false);
            // console.log(req);
            // newUser.push(newRequest);
          })
          .catch(() => {
            console.log('Get user info failed.');
          });
      } else {
        request
          .get('customer/getOne/' + newLoginDetails.ID)
          .then((res) => {
            // call back save data
            const req = new Customer(res.data);
            if (!req.image) {
              req.setImage(images.noImage);
            } else req.setImage('http://localhost:3001/public/' + req.image);
            // console.log(req);
            setLoggedDetail(req);
            setEdit(false);
            setResetData(false);
            // newUser.push(newRequest);
          })
          .catch(() => {
            console.log('Get user info failed.');
          });
      }
    }
    return () => setResetData(false);
  }, [member, resetData, newLoginDetails]);
  useEffect(() => {
    if (hasEdit) {
      if (newLoginDetails.ID) {
        setLoggedDetail(newLoginDetails);
        setShowEditBox(true);
      }
    }
    return () => setEdit(false);
  }, [hasEdit, newLoginDetails]);
  // const handleDoNothing = () => {};
  const handleClickLogo = () => {
    return navigate('/');
  };
  const handleLogin = () => {
    return navigate('/login');
  };
  const handleClickLogout = () => {
    localStorage.removeItem('login');
    return navigate('/login');
  };
  // const handleEditLogged = () => {};
  const handleCloseMenu = () => {
    return setVisible(false);
  };
  const handleOpenMenu = () => {
    return setVisible(true);
  };

  const handleClickOpenFilter = () => {
    return setShowFilter(true);
  };
  const handleOpenEdit = () => {
    setVisible(false);

    return setEdit(true);
  };
  const handleCloseBox = () => {
    setShowEditBox(false);
    // setOpenCart(false);
    setResetData(true);
    setEdit(false);
    setShowFilter(false);
  };
  const handleAddBook = () => {
    setAddRecord(true);
    // setNewData(new Product());
  };
  // const handleAddChapter = () => {
  //   setAddRecord(true);
  //   setNewData(new LightNovel());
  // };

  const handleSearchData = (e) => {
    return setSearchValue(e);
  };
  const handleClickSearchButton = () => {
    if (searchBy === '0') {
      onSearchedByName(searchValue);

      return navigate('/search/');
    } else {
      onSearchedByAuthor(searchValue);
      return navigate('/search/');
    }
  };
  const handleGoToFollowing = () => {
    return navigate('/follow');
  };
  const MENU_LIST = [
    {
      ID: 1,
      title: 'Theo dõi',
      onClick: handleGoToFollowing,
    },
    {
      ID: 2,
      title: 'Lịch sử',
      onClick: () => navigate('/history'),
    },
    {
      ID: 3,
      title: 'Tìm sách',
      onClick: handleClickOpenFilter,
    },

    {
      ID: 5,
      title: 'Đánh dấu',
      onClick: () => navigate('/bookmark'),
    },
    {
      ID: 4,
      title: 'Donate',
      onClick: () => navigate('/donate'),
    },
  ];
  const MenuNav = [
    {
      ID: 5,
      name: 'navigate',
      title: 'Tới trang web quản lý',
      icon: 'faShop',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '3',
      onClick: () => navigate('/admin'),
    },
    {
      ID: 1,
      name: 'upload',
      title: 'Đăng truyện mới',
      icon: 'faUpload',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: () => handleAddBook(),
      // onClick: () => handleOpenEdit(),
    },
    {
      ID: 2,
      name: 'upload',
      title: 'Truyện đã đăng',
      icon: 'faBars',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: () => navigate('/uploaded'),
      // onClick: () => handleOpenEdit(),
    },
    {
      ID: 0,
      name: 'user',
      title: 'Sửa thông tin cá nhân',
      icon: 'faUserPen',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: handleOpenEdit,
    },

    // {
    //   ID: 1,
    //   name: 'mode',
    //   title: 'Mode',
    //   icon: modeIcon,
    //   children: null,
    //   showTime: '2024-05-30T16:14.14.504z',
    //   to: '',
    //   level: '5',
    //   onClick: handleClickModeButton,
    //   //     {
    //   //   ID: 18,
    //   //   name: 'productor',
    //   //   title: 'Thông tin nhà sản xuất',
    //   //   to: '/admin/productor',
    //   //   type: 'Sidebar',
    //   //   icon: 'faBuildingUser',
    //   //   showTime: '2024-05-30T16:14:14.504Z',
    //   //   level: '3',
    //   //   children: null,
    //   // },
    // },

    {
      ID: 4,
      name: 'logout',
      title: 'Đăng xuất',
      icon: 'faArrowRightFromBracket',
      showTime: '2024-05-30T16:14.14.504z',
      onClick: handleClickLogout,
      level: '5',
    },
  ];
  return (
    <header className={cx('wrapper')}>
      <div className={cx('main')}>
        <div className={cx('logo')} onClick={handleClickLogo}>
          <Image src={images.logo} size={'mini'}></Image>
        </div>
        {MENU_LIST.map((menu, index) => (
          <div className={cx('menu')} key={index} onClick={menu.onClick}>
            {menu.title}
          </div>
        ))}

        <div className={cx('search')}>
          <Search
            round='round'
            outline='outline'
            placeholder='Tìm kiếm'
            onChange={handleSearchData}
            onClickSearchButton={handleClickSearchButton}
          />
          <select
            name=''
            id=''
            disabled
            className={cx('selectSearch')}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value='0'>Tìm kiếm theo tên</option>
            <option value='1'>Tìm kiếm theo tác giả</option>
          </select>
        </div>
        {/* {!isReading && (
          <div className={cx('button')}>
            {notification > 0 && (
              <div className={cx('notification')}>{notification}</div>
            )}
            <IconButton
              icon={faCartShopping}
              size={'mini'}
              type='item'
              hover
              round
              onClick={handleOpenCart}
            ></IconButton>
          </div>
        )} */}
        {!newLoginDetails.ID && (
          <div className={cx('menu')} onClick={handleLogin}>
            Đăng nhập
          </div>
        )}
        {newLoginDetails.ID && (
          <Tippy
            // trigger='click'
            interactive='true'
            arrow={true}
            onClickOutside={handleCloseMenu}
            visible={visible}
            placement='bottom-end'
            render={(attrs) => (
              <div className={cx('tippyBox')} {...attrs}>
                <NavList
                  list={MenuNav}
                  hasShow={true}
                  pg={'header'}
                  level={newLoginDetails.level}
                />
              </div>
            )}
          >
            <div className={cx('logo')} onClick={handleOpenMenu}>
              <Image src={newLoginDetails.image} size={'mini'}></Image>
            </div>
          </Tippy>
        )}
      </div>

      {/* {hasOpenCart && (
        <Popup onClick={() => handleCloseBox()}>
          <Cart onCloseBox={handleCloseBox}></Cart>
        </Popup>
      )} */}
      {showFilter && (
        <Popup onClick={() => handleCloseBox()}>
          <BookTypes
            onSearchByTypes={onSearchByTypes}
            onCloseBox={handleCloseBox}
          />
        </Popup>
      )}
      {hasShowEditBox && (
        <Popup onClick={() => handleCloseBox()}>
          <ObjectDetails
            data={loggedDetail}
            loading={'user'}
            // onChange={handleChange}
            onClickRefresh={() => setResetData(true)}
            onCloseBox={() => handleCloseBox()}
            // onClickSave={handleEdit}
          ></ObjectDetails>
        </Popup>
      )}
      {addNewRecord && (
        <Popup onClick={() => setAddRecord(false)}>
          <AddBox
            books={books}
            newBook
            logginDetails={logginDetails}
            onCloseBox={() => setAddRecord(false)}
          ></AddBox>
        </Popup>
      )}
    </header>
  );
}

export default Header;
