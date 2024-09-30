import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);
function Like({ dataHref, dataLocal }) {
  const [local] = useState(dataLocal);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,

        version: 'v20.0',
      });
      // window.FB.ui(
      //   {
      //     display: 'popup',
      //     method: 'share',
      //     href: 'https://nettruyenll.com/user/bookmarks',
      //   },
      //   function (response) {}
      // );
      // window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/' + local + '/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
  return (
    <div className={cx('wrapper')}>
      <div
        className='fb-like'
        //  data-href= 'https://nettruyenll.com/user/bookmarks'
        data-href={dataHref}
        data-width=''
        data-layout=''
        data-action=''
        data-size=''
        data-share={true}
      ></div>
    </div>
  );
}

export default Like;
