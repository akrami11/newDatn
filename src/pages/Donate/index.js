import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Donate.module.scss';

import { getPrice, setPrice } from '~/assets/content/';
import Image from '~/components/Image';
import Input from '~/components/Input';
import images from '~/assets/images';
import TextButton from '~/components/Button/TextButton';
import request from '~/utils/request';
const cx = classNames.bind(styles);
function Donate({ books, logginDetails, follow, history, lightNovel }) {
  const [QR, setQR] = useState([]);
  const [option, setOption] = useState('momo');
  const [newValue, setValue] = useState();
  const [hasDonate, setDonate] = useState(false);

  useEffect(() => {
    if (newValue) {
      request
        .post('vnpay/create_payment_url', {
          amount: newValue,
          bankCode: '',
          orderDescription: 'test 01',
          orderType: '190003',
          returnUrl: 'http://localhost:3000/donate',
          language: '',
        })
        .then((res) => {
          setDonate(res.data);
          console.log('req : ', res.data);
        })
        .catch(() => {
          return 1;
        });
    }
  });

  useEffect(() => {
    if (option) {
      switch (option) {
        case 'momo':
          setQR(images.momo);
          break;
        case 'zalopay':
          setQR(images.zalopay);
          break;
        case 'acb':
          setQR(images.acb);
          break;
        case 'more':
          setQR();
          break;

        default:
          break;
      }
    }
  }, [option]);

  const handleClickOption = (e) => {
    return setOption(e);
  };
  const handleChangeDonate = (e) => {
    return setValue(setPrice(e));
  };

  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      <div className={cx('header')}>Ủng hộ chúng tôi :</div>
      <div className={cx('main')}>
        <div className={cx('title')}>
          <div
            className={cx('options')}
            onClick={() => handleClickOption('momo')}
          >
            Tài khoản momo :
          </div>
          <div
            className={cx('options')}
            onClick={() => handleClickOption('acb')}
          >
            Tài khoản ngân hàng :
          </div>

          <div
            className={cx('options')}
            onClick={() => handleClickOption('zalopay')}
          >
            Tài khoản zalopay :
          </div>
          <div
            className={cx('options')}
            onClick={() => handleClickOption('more')}
          >
            Khác :
          </div>
        </div>
        {QR && (
          <div>
            <Image src={QR} type='qr'></Image>
          </div>
        )}
        {!QR && (
          <div className={cx('banner')}>
            <div className={cx('options')}>
              <div className={cx('label')}>Số tiền :</div>
              <Input
                value={getPrice(newValue)}
                border
                placeHolder={'Nhập số tiền ủng hộ'}
                onChange={handleChangeDonate}
              ></Input>
              <TextButton type={'success'} size='large' radius to={hasDonate}>
                Ủng hộ
              </TextButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donate;
