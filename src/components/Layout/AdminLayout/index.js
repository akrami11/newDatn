import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import Header from './Header';
import Sidebar from './Sidebar';
import request from '~/utils/request';
import images from '~/assets/images';
import User from '~/assets/db/tables/user.js';
import Popup from '~/components/PopupComponent';
import ObjectDetails from '~/components/ObjectDetails';

import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  // console.log(page);
  // set children to Component :
  // const Child = children.type;
  //get mode :
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem('mode'))
    // localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'
  );
  // console.log('asdasdasd', mode);
  const [login, setLogin] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [hasEdit, setEdit] = useState(false);
  // set toggle :
  const [hasToggle, setHasToggle] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [saveStorage, setSaveStorage] = useState(false);
  // const [hasChosen, setHasChosen] = useState(false);

  //check login :
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(JSON.parse(localStorage.getItem('login')));
      setSaveStorage(true);
    } else if (sessionStorage.getItem('login')) {
      setLogin(JSON.parse(sessionStorage.getItem('login')));
      setSaveStorage(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  //get login user
  useEffect(() => {
    if (hasEdit) {
      request
        .get('user/getOne/' + login.ID)
        .then((res) => {
          // call back save data
          const req = new User(res.data);
          if (!req.image) {
            req.setImage(images.noImage);
          } else req.setImage('http://localhost:3001/public/' + req.image);
          const newRequest = {
            ID: req.ID,
            name: req.lastName + ' ' + req.firstName,
            image: req.image,
          };
          if (saveStorage) {
            localStorage.setItem('member', JSON.stringify(newRequest));
          } else {
            sessionStorage.setItem('member', JSON.stringify(newRequest));
          }
          setLoggedUser(req);
          setEdit(false);
          setShowEditBox(true);
          // setResetData(false);
          // newUser.push(newRequest);
        })
        .catch(() => {
          console.log('Get user info failed.');
        });
    }
    return () => setResetData(false);
  }, [hasEdit, saveStorage, resetData, login]);
  // reload mode :
  useEffect(() => {
    localStorage.setItem('mode', mode);
    // console.log('newwww', mode);
  }, [mode]);

  const handleToggle = () => {
    setHasToggle(!hasToggle);
    // console.log(hasToggle);
  };
  const handleChangeMode = () => {
    // settest(!test);
    // console.log('newwwwb', mode);
    // // localStorage.setItem('mode', mode);
    return setMode(!mode);
    // if (mode === 'light') {
    //   setMode('dark');
    // } else {
    //   setMode('light');
    // }
  };
  const handleEditUserLogged = () => {
    console.log('dasdasdasd');
    return setEdit(true);
  };
  const handleCloseBox = () => {
    return setShowEditBox(false);
  };

  // const handleChoiceList = (choice) => {
  //   // setHasChosen(choice);
  // };
  // console.log(hasChosen);
  return (
    <div className={cx('wrapper', mode === true ? 'dark' : 'light')}>
      <Header
        hasToggle={hasToggle}
        handleChangeMode={handleChangeMode}
        mode={mode}
        onEditUserLogged={handleEditUserLogged}
      />
      <div className={cx('container')}>
        <Sidebar
          hasToggle={hasToggle}
          onClick={handleToggle}
          login={login}
          // onSelectList={handleChoiceList}
        />
        <div className={cx('main', hasToggle && 'toggled')}>{children}</div>
        {showEditBox && (
          <Popup onClick={() => handleCloseBox()}>
            <ObjectDetails
              data={loggedUser}
              loading={'user'}
              edit
              // onChange={handleChange}
              onClickRefresh={() => setResetData(true)}
              onCloseBox={() => handleCloseBox()}
              // onClickSave={handleEdit}
            ></ObjectDetails>
          </Popup>
        )}
      </div>
      <footer className={cx('footer')}>
        <span> DATN by NGUYEN QUANG NAM.</span>{' '}
        <span>
          Phone: {process.env.REACT_APP_PHONE_NUMBER}. Email:{' '}
          {process.env.REACT_APP_HOST_EMAIL}
        </span>
      </footer>
    </div>
  );
}

export default AdminLayout;
