import classNames from 'classnames/bind';
// import { useState } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/themes/light.css';

import { faBell, faComment } from '@fortawesome/free-regular-svg-icons';
// import { faWordpress } from '@fortawesome/free-brands-svg-icons';

// import Image from '~/components/Image';
import MessageBox from '~/components/MessageBox';
import Button from '~/components/Button';
import Search from '~/components/Search';
import NavList from '~/components/NavList';
import images from '~/assets/images';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({
  hasToggle,
  // user,
  handleChangeMode,
  onEditUserLogged,
  // avatar,
  mode,
}) {
  const [toggleClass, setToggleClass] = useState('');
  const [login, setLogin] = useState({});
  const [user, setUser] = useState({});
  const [modeIcon, setModeIcon] = useState(mode ? 'faToggleOff' : 'faToggleOn');
  const [searchClass, setSearchClass] = useState('search');
  if (searchClass) {
  }
  const [closeMessageBox, setCloseMessageBox] = useState('');
  const [openMessageBox, setOpenMessageBox] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [hideTippy, setHideTippy] = useState(true);
  const [visible, setVisible] = useState(false);
  // const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(JSON.parse(localStorage.getItem('login')));
      setUser(JSON.parse(localStorage.getItem('member')));
    } else if (sessionStorage.getItem('login')) {
      setLogin(JSON.parse(sessionStorage.getItem('login')));
      setUser(JSON.parse(sessionStorage.getItem('member')));
    }
  }, []);

  useEffect(() => {
    if (hasToggle) {
      setToggleClass('toggled');
      setSearchClass('searchToggled');
    } else {
      setToggleClass('');
      setSearchClass('search');
    }
  }, [hasToggle]);

  useEffect(() => {
    if (mode) {
      setModeIcon('faToggleOff');
    } else setModeIcon('faToggleOn');
  }, [mode]);

  //open new or already opened mess box :
  useEffect(() => {
    if (openMessageBox) {
      if (messageList) {
        if (checkValidate(messageList, openMessageBox) >= 0) {
          messageList.forEach((message) => {
            if (message.title === openMessageBox) {
              return (message.status = true);
            }
          });
        } else
          return setMessageList((msg) => [
            ...msg,
            { title: openMessageBox, status: true },
          ]);
      } else return setMessageList([openMessageBox]);
      return setOpenMessageBox('');
    }
    // console.log(messageList);
  }, [openMessageBox, messageList]);

  //close already opened mess box :
  useEffect(() => {
    if (closeMessageBox) {
      if (messageList) {
        const index = checkValidate(messageList, closeMessageBox);
        if (index >= 0) {
          messageList.splice(index, 1);
        }
      }
      setCloseMessageBox('');
    }
    // console.log(messageList);
  }, [closeMessageBox, messageList]);

  // useEffect(() => {
  //   console.log(messageList);
  //   // console.log(messageList);
  // }, [messageList]);

  const checkValidate = (array, str) => {
    let fl = -1;
    if (Array.isArray(array)) {
      array.forEach((arr, index) => {
        if (arr === str || arr.title === str || arr.content === str) {
          return (fl = index);
        }
      });
    }
    return fl;
  };

  // const getArrayItem = (array, index) => {
  //   return array[index];
  // };
  const handleClickModeButton = () => {
    return handleChangeMode();
  };
  const handleClickLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('member');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('member');
    navigate('/login');
  };
  const handleOpenMessageBox = (title) => {
    // console.log('title', title);
    // setShowNow(title);
    // return setMessageBox(title);
    return setOpenMessageBox(title);
  };
  const handleCloseMessageBox = (title) => {
    // console.log('title', title);
    return setCloseMessageBox(title);
  };
  const handleToggleMessageBox = (title) => {
    // console.log('title', title);
    if (messageList) {
      if (checkValidate(messageList, title) >= 0) {
        messageList.forEach((message) => {
          if (message.title === title) {
            return (message.status = !message.status);
          }
        });
      }
    }
    return messageList[checkValidate(messageList, title)];
  };
  const checkListMessage = (list, msg) => {
    // console.log('msg : ', msg, 'list : ', list);
    if (Array.isArray(list)) {
      if (checkValidate(list, msg) >= 0) {
        return list[checkValidate(list, msg)];
      } else return {};
    } else return {};
  };
  const handleEditLogged = () => {
    handleCloseMenu();
    return onEditUserLogged();
  };
  const handleCloseMenu = () => {
    return setVisible(false);
  };
  const handleOpenMenu = () => {
    return setVisible(true);
  };
  //     _id: '6658a5d927f8379199ff5864',
  //     ID: 5,
  //     Name: 'customer',
  //     Title: 'Quản lý khách hàng',
  //     to: '/admin/customer',
  //     children: [6, 7],
  //     Type: 'Sidebar',
  //     icon: 'faUserCircle',
  //     ShowTime: '2024-05-30T16:14:14.504Z',
  //     Level: '0',
  const listMenu = [
    // {
    //   ID: 1,
    //   name: 'username',
    //   title: 'Tới trang web bán hàng',
    //   icon: 'faShop',
    //   children: null,
    //   showTime: '2024-05-30T16:14.14.504z',
    //   to: '',
    //   level: '5',
    //   onClick: () => navigate('/'),
    // },
    {
      ID: 2,
      name: 'navigate',
      title: 'Tới trang web bán hàng',
      icon: 'faShop',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: () => navigate('/'),
    },
    {
      ID: 3,
      name: 'user',
      title: 'Sửa thông tin cá nhân',
      icon: 'faUserPen',
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: handleEditLogged,
    },
    {
      ID: 4,
      name: 'mode',
      title: 'Mode',
      icon: modeIcon,
      children: null,
      showTime: '2024-05-30T16:14.14.504z',
      to: '',
      level: '5',
      onClick: handleClickModeButton,
      //     {
      //   ID: 18,
      //   name: 'productor',
      //   title: 'Thông tin nhà sản xuất',
      //   to: '/admin/productor',
      //   type: 'Sidebar',
      //   icon: 'faBuildingUser',
      //   showTime: '2024-05-30T16:14:14.504Z',
      //   level: '3',
      //   children: null,
      // },
    },

    {
      ID: 5,
      name: 'logout',
      title: 'Đăng xuất',
      icon: 'faArrowRightFromBracket',
      showTime: '2024-05-30T16:14.14.504z',
      onClick: handleClickLogout,
      level: '5',
    },
  ];
  const listMessage = [
    {
      ID: 1,
      name: 'message',
      title: 'Msg_user_name1',
      user_name: 'user name 1',
      img: images.logo,
      showTime: '2024-05-30T16:14.14.504z',
      onClick: 'open_this_message',
      level: '5',
      msg: [
        {
          sent_msg: 'hello',
        },
        {
          received_msg: 'hwllohwllohwllohwllohwllo hwllohwllohwllohwllohwllo',
        },
        {
          sent_msg: 'howaaaaaaaaaaaaaaaau',
        },
        {
          received_msg:
            'im fine thks, and you? im fine thks, and you? im fine thks, and you? im fine thks, and you? im fine thks, and you? im fine thks, and you?',
        },
      ],
    },
    {
      ID: 2,
      name: 'message',
      title: 'Msg_user_name2',
      user_name: 'user name 2',
      img: images.logo,
      showTime: '2024-05-30T16:14.14.504z',
      level: '5',
      msg: [
        {
          sent_msg: 'hello',
          received_msg: '',
        },
        {
          sent_msg: '',
          received_msg: 'hwllo to',
        },
        {
          sent_msg: 'how are you',
          received_msg: '',
        },
        {
          sent_msg: '',
          received_msg: 'im fine thks, and you?',
        },
      ],
    },
    {
      ID: 3,
      name: 'message',
      title: 'Msg_user_name3',
      user_name: 'user name 3',
      img: images.logo,
      showTime: '2024-05-30T16:14.14.504z',
      level: '5',
      msg: [
        {
          sent_msg: 'hello',
          received_msg: '',
        },
        {
          sent_msg: '',
          received_msg: 'hwllo to',
        },
        {
          sent_msg: 'how are you',
          received_msg: '',
        },
        {
          sent_msg: '',
          received_msg: 'im fine thks, and you?',
        },
      ],
    },
  ];
  return (
    <header className={cx('wrapper', toggleClass)}>
      {/* <div className={cx(toggleClass)}> */}

      {/* </div> */}
      <div className={cx('search')}>
        <Search round='round' outline='outline' />
      </div>

      {/* <div>
          <input type='text' />
        </div> */}
      <div className={cx('action')}>
        {/* <Tippy content='Thông báo' theme={mode}> */}
        <div className={cx('buttonIcon')}>
          <Button icon={faBell} type={'actButton'}></Button>
        </div>
        {/* </Tippy> */}
        {/* <Tippy content='Tin nhắn' theme={mode}> */}
        <div>
          <Tippy
            trigger='click'
            interactive='true'
            arrow='true'
            render={(attrs) => (
              <div className={cx('tippyBox')} {...attrs}>
                <NavList
                  list={listMessage}
                  hasShow={true}
                  type='msg'
                  handleOpenMessageBox={handleOpenMessageBox}
                />
              </div>
            )}
          >
            <div className={cx('buttonIcon')}>
              <Button icon={faComment} type={'actButton'}></Button>
            </div>
          </Tippy>
        </div>
        {/* </Tippy> */}
        <Tippy
          // trigger='click'
          interactive='true'
          arrow={true}
          // hideOnClick={true}
          onClickOutside={handleCloseMenu}
          visible={visible}
          // onClickOutside={setHideTippy(false)}
          render={(attrs) => (
            <div className={cx('tippyBox')} {...attrs}>
              <NavList
                list={listMenu}
                hasShow={true}
                pg={'header'}
                level={login.level}
              />
            </div>
          )}
        >
          <div className={cx('buttonIcon')} onClick={handleOpenMenu}>
            <Button src={user.image}></Button>
          </div>
        </Tippy>
      </div>
      <div className={cx('message')}>
        {Array.isArray(messageList) &&
          messageList.map(
            (message, index) =>
              checkListMessage(listMessage, message.title) && (
                <MessageBox
                  message={checkListMessage(listMessage, message.title)}
                  hasShowMsg={message.status}
                  closeMessageBox={handleCloseMessageBox}
                  collapseMessageBox={handleToggleMessageBox}
                  key={index}
                />
              )
          )}
      </div>
    </header>
  );
}

export default Header;
