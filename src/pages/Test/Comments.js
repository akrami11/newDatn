import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);
function Comments({ dataHref, dataLocal }) {
  const [local] = useState(dataLocal);
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        // appId: 724004413185163,
        cookie: true,
        xfbml: true,
        status: true,
        version: 'v20.0',
      });
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
        className='fb-comments'
        data-href={dataHref}
        data-width='300'
        data-numposts='5'
      ></div>
    </div>
  );
}

export default Comments;
