import React from 'react';
import emailjs from '@emailjs/browser';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import styles from './Test.module.scss';
import request from '~/utils/request';
import LightNovel from 'src/components/ListLightNovel';
import images from '~/assets/images';
// import IconButton from '~/components/Button/IconButton';
// import TextButton from '~/components/Button/TextButton';
// import Popup from '~/components/PopupComponent';
// import Log from '~/components/LogMessage';
// // import Image from '~/components/Image';
// // import Input from '~/components/Input';
// // import EditableInput from '~/components/EditableInput';
// import { Comments as FbComments } from '~/components/_FbPlugin';
// import Comments from '~/components/Comments';
// // import Comments from '~/components/_FbPlugin/Comments';
// // import Like from '~/components/_FbPlugin/Like';
// import {
//   //  getTag, getPrice,
//   getIcon,
// } from '~/assets/content';

const cx = classNames.bind(styles);
function Read() {
  // params
  // const { ID, ChapterID } = useParams();
  const [newUrl, setUrl] = useState('');
  const [onGetUrl, hasGetUrl] = useState(false);
  useEffect(() => {
    if (onGetUrl) {
      request
        .post('vnpay/create_payment_url', {
          amount: '10000',
          bankCode: '',
          orderDescription: 'test 01',
          orderType: '190003',
          returnUrl: 'http://localhost:3000/test',
          language: '',
        })
        .then((res) => {
          setUrl(res.data);
          console.log('req : ', res.data);
        })
        .catch(() => {
          return 1;
        });
    }
    return () => hasGetUrl(false);
  });
  useEffect(() => {
    if (newUrl) return console.log('newUrl : ', newUrl);
  }, [newUrl]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left')}>
        {<button onClick={() => hasGetUrl(true)}>click click</button>}
      </div>
    </div>
  );
}

export default Read;
