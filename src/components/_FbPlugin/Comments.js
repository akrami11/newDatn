import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './FbPlugin.module.scss';

const cx = classNames.bind(styles);
function Comments({ dataHref, dataLocal, dataWitdh }) {
  const [local] = useState(dataLocal);
  const [hasInited, setInitial] = useState(false);
  useEffect(() => {
    window.fbAsyncInit = function () {
      // console.log(456);
      setInitial(true);
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        // appId: 724004413185163,
        localStorage: true,
        cookie: true,
        xfbml: true,
        status: true,
        version: 'v20.0',
      });
    };

    (function (d, s, id) {
      // console.log(123);
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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!hasInited) {
        (function () {
          window.FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            // appId: 724004413185163,
            cookie: true,
            xfbml: true,
            status: true,
            version: 'v20.0',
          });
        })();
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [hasInited]);
  return (
    <div className={cx('wrapper')}>
      <div
        className='fb-comments'
        data-href={dataHref}
        data-width={dataWitdh ? dataWitdh : '600'}
        data-order-by='time'
        data-numposts='5'
        data-lazy='true'
        data-colorstheme='dark'
      ></div>
    </div>
  );
}

export default Comments;
