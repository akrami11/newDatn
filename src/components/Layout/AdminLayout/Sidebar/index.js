import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Sidebar.module.scss';

import Button from '~/components/Button';
// import Search from '~/components/Search';
import NavList from '~/components/NavList';
import MenuList from '~/assets/construct/sidebar.js';
// import {
//   faArrowRightFromBracket,
//   faArrowRightToBracket,
//   faChartColumn,
//   faLayerGroup,
//   faUserClock,
//   faUserPen,
//   faUserTie,
//   faWarning,
// } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import request from '~/utils/request';
// import Interface from '~/assets/db/tables/interface.js';

// import { faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
// import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Sidebar({ login, hasToggle, onClick }) {
  // console.log(hasToggle);
  const [sidebarClass, setSidebarClass] = useState('');
  const [hasMouseMove, setMouseIn] = useState(false);
  const [hasShowSidebar, setShowSidebar] = useState(true);
  const [sidebarMenu] = useState(MenuList);
  // const [sidebarMenu, setSidebarMenu] = useState([]);
  // const [resetSidebar, setResetSidebar] = useState(true);

  // useEffect(() => {
  //   if (resetSidebar) {
  //     request
  //       .get('interface/sidebar')
  //       .then((req) => {
  //         const newDatas = req.data.map((data) => new Interface(data));
  //         console.log('req : ', newDatas);
  //         return setSidebarMenu(newDatas);
  //       })
  //       .catch(() => setSidebarMenu(newList));
  //   }
  //   return () => setResetSidebar(false);
  // }, [resetSidebar]);

  useEffect(() => {
    if (hasToggle && !hasMouseMove) {
      setShowSidebar(false);
      setSidebarClass('toggled');
    } else {
      setShowSidebar(true);
      setSidebarClass('');
    }
  }, [hasToggle, hasMouseMove]);

  // useState(() => {
  //   if (sidebarMenu.length === 0) {
  //     setSidebarMenu(newList);
  //   }
  // }, [sidebarMenu]);
  const handleToggle = () => {
    return onClick && onClick();
  };
  // console.log(hasShowSidebar);
  const handleMouseMove = () => {
    if (hasToggle) return setMouseIn(true);
  };
  const handleMouseOut = () => {
    // console.log(2);
    return setMouseIn(false);
  };

  return (
    <div
      className={cx('wrapper', sidebarClass)}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <div className={cx('sidebarHeader')}>
        <div className={cx('title')}>
          {hasShowSidebar && (
            <Button type='header' to='/admin' hover='hover'>
              Đồ án tốt nghiệp
            </Button>
          )}
        </div>
        <div className={cx('btnIcon')}>
          <Button
            type='header'
            onClick={handleToggle}
            icon={faBars}
            hover='hover'
            position={'right'}
          />
        </div>
      </div>
      {/* {hasShowSidebar && (
        <div className={cx('content')}>
          <Search round='round'></Search>
        </div>
      )} */}

      <div className={cx('content')}>
        <NavList
          hasShow={hasShowSidebar}
          list={sidebarMenu}
          switchColor={true}
          level={login.level}
        ></NavList>
      </div>
      {/* {editSidebar && (
        <div className={cx('content')}>
          <NavList
            hasShow={hasShowSidebar}
            list={newItemComponent}
            switchColor={true}
            level={user.level}
          ></NavList>
        </div>
      )} */}

      {/* <div>asdasda</div>
      <div>asdasda</div>
      <div>asdasda</div>
      <div>asdasda</div>
      <div>asdasda</div> */}
    </div>
  );
}

export default Sidebar;
