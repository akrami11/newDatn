import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);
function LoginButton() {
  const [local] = useState('vi_VN');
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        // appId: 724004413185163,
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });

      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
      // // window.FB.AppEvents.logPageView();
      // window.FB.api(
      //   process.env.REACT_APP_FACEBOOK_APP_ID + '/admins/{100013051094004}',
      //   function (response) {
      //     if (response && !response.error) {
      //       /* handle the result */
      //     }
      //   }
      // );
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

  function statusChangeCallback(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      window.FB.api('/me', { fields: 'name, email' }, function (response) {
        console.log(response);
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }
  window.loginCallback = () => {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };
  return (
    <div className={cx('wrapper')}>
      <div
        className='fb-login-button'
        config_id='{config_id}'
        data-onlogin={'loginCallback()'}
        data-width=''
        data-size='large'
        data-button-type=''
        data-layout=''
        data-auto-logout-link='true'
        data-use-continue-as='true'
      ></div>
    </div>
  );
}

export default LoginButton;
