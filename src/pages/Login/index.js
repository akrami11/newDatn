import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Account from '~/assets/db/tables/account.js';
import Customer from '~/assets/db/tables/customer.js';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import request from '~/utils/request';
import TextButton from '~/components/Button/TextButton';
import IconButton from '~/components/Button/IconButton';
import images from '~/assets/images';
import Input from '~/components/Input';
import Image from '~/components/Image';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Msg from '~/components/LogMessage';
const cx = classNames.bind(styles);

function Login() {
  const [customer] = useState(new Customer());
  const [account] = useState(new Account());
  const [randomCapcha, setCapcha] = useState();
  const [requestCapcha, setRequestCapcha] = useState();
  const [accountValue, setAccountValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [newPasswordValue2, setNewPasswordValue2] = useState('');
  const [hasResetValue, setHasResetValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [hasLogin, setHasLogin] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasForget, setForget] = useState(false);
  const [hasRegis, setRegis] = useState(false);
  const [getNewPassword, setNewPassword] = useState(false);
  const [regis, setRegisted] = useState(false);
  const [hasSendMail, setSendMail] = useState(false);
  const [hasResend, setResend] = useState(false);
  const [hasRequest, setRequest] = useState(false);
  const [passwordwrong, setWrong] = useState(false);
  const [hasGetNewID, setGetNewID] = useState(false);
  const [hasCreated, setCreated] = useState(false);
  const [hasUpdated, setUpdated] = useState(false);
  const [newCustomer, setNewCustomer] = useState(new Customer());
  const [newAccount, setNewAccount] = useState(new Account());
  const [user, setUser] = useState({});
  const [correctUser, setCorrectUser] = useState({});
  const [forgetUser, setForgetUser] = useState({});
  // useEffect(() => {
  //   console.log(hasEnter);
  // }, [hasEnter]);
  // console.log((123123));
  const [types, setTypes] = useState('text');
  const navigate = useNavigate();
  useEffect(() => {
    if (hasResetValue) {
      setAccountValue('');
      setPasswordValue('');
      setHasResetValue(false);
      setShowPassword(false);
      setShowPassword2(false);
      setHasLogin(false);
      setSavePassword(false);
      setLoginFail(false);
      setLoggedIn(false);
      // setForget(false);
      // setRegis(false);
      setNewPassword(false);
      setRegisted(false);
      setSendMail(false);
      setResend(false);
      setRequest(false);
      setWrong(false);
      setGetNewID(false);
      setUser({});
      setCorrectUser({});
      setForgetUser({});
      setNewPasswordValue('');
      setNewPasswordValue2('');
      setRequestCapcha();
      setNewCustomer(new Customer());
      setNewAccount(new Account());
    }
    return () => setHasResetValue(false);
  }, [hasResetValue]);
  useEffect(() => {
    if (showPassword) {
      setTypes('text');
    } else {
      setTypes('password');
    }
  }, [showPassword]);

  //changevalue:
  useEffect(() => {
    if (newPasswordValue && newPasswordValue2) {
      if (newPasswordValue !== newPasswordValue2) {
        setWrong(true);
      } else {
        // correctUser.setPassword(newPasswordValue);
        // correctUser.update();
        setWrong(false);
      }
    }
    return;
  }, [newPasswordValue, newPasswordValue2, correctUser]);
  useEffect(() => {
    if (accountValue) {
      setHasLogin(false);
    }
    if (passwordValue) {
      setHasLogin(false);
    }
    return () => setLoginFail(false);
  }, [accountValue, passwordValue]);
  useEffect(() => {
    if (hasLogin) {
      if (accountValue) {
        if (passwordValue) {
          request
            .post('login', {
              username: accountValue,
              password: md5(passwordValue),
            })
            .then((res) => {
              // console.log('req : ', res.data);
              setLoggedIn(true);

              if (res.data === null) {
                return setLoginFail(true);
              }
              return setUser(res.data);
            })
            .catch(() => {
              // console.log('fail');
              return setLoginFail(true);
            });
        }
      }
    }
    return () => setHasLogin(false);
  });

  useEffect(() => {
    if (loggedIn && !loginFail) {
      if (user.level <= 3) {
        request
          .get('user/getOne/' + user.AID)
          .then((res) => {
            console.log(123);
            const request = res.data;

            const image = request.image
              ? 'http://localhost:3001/public/' + request.image
              : images.noImage;
            delete request.image;
            const loginData = { ID: user.AID, level: user.level };
            const newRequest = {
              ID: request.ID,
              name: request.lastName + ' ' + request.firstName,
              image: image,
              member: 1,
            };
            if (savePassword) {
              localStorage.setItem('login', JSON.stringify(loginData));
              localStorage.setItem('member', JSON.stringify(newRequest));
              return navigate('/admin');
            } else {
              sessionStorage.setItem('login', JSON.stringify(loginData));
              sessionStorage.setItem('member', JSON.stringify(newRequest));
              return navigate('/admin');
            }
          })
          .catch(() => {
            return setLoginFail(true);
          });
      } else {
        request
          .get('customer/getOne/' + user.AID)
          .then((res) => {
            const request = res.data;

            const image = request.image
              ? 'http://localhost:3001/public/' + request.image
              : images.noImage;
            delete request.image;
            const loginData = { ID: user.AID, level: user.level };
            const newRequest = {
              ID: request.ID,
              name: request.lastName + ' ' + request.firstName,
              image: image,
              member: 0,
            };
            if (savePassword) {
              localStorage.setItem('login', JSON.stringify(loginData));
              localStorage.setItem('member', JSON.stringify(newRequest));
              return navigate('/');
            } else {
              sessionStorage.setItem('login', JSON.stringify(loginData));
              sessionStorage.setItem('member', JSON.stringify(newRequest));
              return navigate('/');
            }
          })
          .catch(() => {
            return setLoginFail(true);
          });
      }
    }
    return () => setLoggedIn(false);
  });
  // forget pass :

  useEffect(() => {
    if (getNewPassword) {
      if (accountValue) {
        request
          .post('login', {
            username: accountValue,
          })
          .then((res) => {
            // console.log('req : ', res.data);
            if (res.data === null) {
              return setLoginFail(true);
            }
            if (res.data.AID.length === 3) {
              return setLoginFail(true);
            }
            // console.log('gwet te', new Account(res.data));
            setCorrectUser(new Account(res.data));
          })
          .catch(() => {
            // console.log('fail');
            return 1;
          });
      }
    }
    return () => setNewPassword(false);
  });
  useEffect(() => {
    if (
      correctUser &&
      correctUser.AID &&
      correctUser.AID.length === 4 &&
      !forgetUser.ID
    ) {
      console.log('correctUser', correctUser);
      request
        .get('customer/getOne/' + correctUser.AID)
        .then((res) => {
          console.log(res.data);
          const req = res.data;
          setForgetUser(req);
          if (req === null) {
            return setLoginFail(true);
          }
          if (req.email) {
            setSendMail(true);
          }
          // console.log(req);
        })
        .catch(() => {
          return setLoginFail(true);
        });
    }
    return () => setLoggedIn(false);
  });

  // regis new account :
  useEffect(() => {
    if (regis && !hasGetNewID) {
      request
        .get('customer/getLastRecord')
        .then((res) => {
          const counter = Number(res.data.ID) + 1;
          if (counter < 10) {
            newCustomer.setID('000' + counter);
            newAccount.setAID('000' + counter);
          } else if (counter < 100) {
            newCustomer.setID('00' + counter);
            newAccount.setAID('00' + counter);
          } else if (counter < 1000) {
            newCustomer.setID('0' + counter);
            newAccount.setAID('0' + counter);
          } else {
            newCustomer.setID(counter.toString());
            newAccount.setAID(counter.toString());
          }
          return setGetNewID(true);
          // console.log('cus', dataDetail);
        })
        .catch(() => {
          return 1;
        });
    }
  }, [regis, newCustomer, newAccount, hasGetNewID]);
  useEffect(() => {
    if (hasGetNewID) {
      if (newCustomer.ID && newAccount.AID) {
        try {
          newAccount.setLevel(5);
          customer.set(newCustomer);
          account.set(newAccount);
          customer.create();
          account.create();
          setRegis(false);
          setCreated(true);
        } catch (e) {
          return setCreated(false);
        }
        return setHasResetValue(true);
      }
    }
    return () => setRegisted(false);
  }, [hasGetNewID, newCustomer, newAccount, customer, account]);
  // console.log(loginFail);
  useEffect(() => {
    if (randomCapcha && requestCapcha) {
      if (randomCapcha === Number(requestCapcha)) {
        return setRequest(true);
      }
    }
  }, [randomCapcha, requestCapcha]);
  useEffect(() => {
    const randomCap = () => {
      return Math.floor(Math.random() * 9000) + 1000;
    };
    // console.log('send : ', hasSendMail, forgetUser, forgetUser.email);
    if (hasSendMail && forgetUser && forgetUser.email) {
      const newCapcha = randomCap();
      setCapcha(newCapcha);
      console.log(newCapcha, forgetUser);
      emailjs
        .send(
          'service_datn2',
          'template_5d60l49',
          {
            from_name: 'namnguyenln',
            to_name: accountValue,
            message: newCapcha,
            user_email: forgetUser.email,
            // user_email: 'nguyenquangnam03@gmail.com',
            reply_to: forgetUser.email,
          },
          {
            publicKey: '9TOaGAwMIcgwOFQye',
            privateKey: 'b4HXVIfLbann1telTeSzF',
          }
        )
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error);
          }
        );
    }
    return () => setSendMail(false);
  }, [accountValue, hasSendMail, forgetUser]);

  useEffect(() => {});
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setHasLogin(true);
    }
  };
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else setShowPassword(true);
  };
  const handleShowPassword2 = () => {
    if (showPassword2) {
      setShowPassword2(false);
    } else setShowPassword2(true);
  };
  const handleClickLogin = () => {
    // console.log('click click');
    return setHasLogin(true);
  };

  const handleReset = () => {
    return setHasResetValue(true);
  };
  const handleChangeCheckBox = () => {
    console.log(savePassword);
    return setSavePassword(!savePassword);
  };
  const handleClickForget = () => {
    setRegis(false);
    return setForget(!hasForget);
  };
  const handleClickRegis = () => {
    setForget(false);
    return setRegis(!hasRegis);
  };
  const handleClickGetNew = () => {
    setNewPassword(true);
  };
  const handleClickRegisted = () => {
    setRegisted(true);
  };
  const handleChangCapcha = (e) => {
    return setRequestCapcha(e);
    // if (e === randomCapcha) {
    //   return setRequest(true);
    // }
  };
  const handleResendEmail = () => {
    setSendMail(true);
    return setResend(true);
  };
  const handleSetNewPassword = (e) => {
    return setNewPasswordValue(e);
  };
  const handleSetNewPassword2 = (e) => {
    return setNewPasswordValue2(e);
  };
  const handleChangePassword = () => {
    console.log(passwordwrong);
    if (!passwordwrong) {
      try {
        correctUser.setPassword(newPasswordValue);
        correctUser.update();
        setForget(false);
        setUpdated(true);
        return setHasResetValue(true);
      } catch (error) {
        setUpdated(false);
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('loginPanel')} onKeyDown={handleEnter}>
        <div className={cx('header')}>
          {!hasForget && !hasRegis && (
            <div className={cx('logo')}>
              <Image src={images.logo} size={'normal'}></Image>
            </div>
          )}
          <div className={cx('labelHeader')}>
            {!hasForget && !hasRegis && 'Welcome to Hiệu sách Nguyễn Nam'}
            {hasForget && 'Tìm lại mật khẩu'}
            {hasRegis && 'Đăng kí tài khoản'}
          </div>
        </div>
        {!hasForget && !hasRegis && (
          <form className={cx('loginMain')}>
            {loginFail && (
              <div className={cx('noitice')}>
                Bạn đã nhập sai tài khoản hoặc mật khẩu!
              </div>
            )}
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'username'}>
                Tài Khoản :
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'username'}
                  placeholder='Nhập tài khoản'
                  autocomplete={'username'}
                  value={accountValue}
                  onChange={(e) => setAccountValue(e)}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'password'}>
                Mật Khẩu
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'password'}
                  placeholder={types === 'text' ? 'Nhập mật khẩu' : '******'}
                  value={passwordValue}
                  type={types}
                  // icon={faEye}
                  content='Show/Hidden password'
                  autocomplete={'current-password'}
                  onChange={(e) => setPasswordValue(e)}
                />
                <IconButton
                  icon={types === 'text' ? faEyeSlash : faEye}
                  size={'small'}
                  onClick={handleShowPassword}
                ></IconButton>
              </div>
            </div>
            <div className={cx('savePasswordButton')}>
              <div>
                <Input
                  id={'checkBox'}
                  value={savePassword}
                  type={'checkBox'}
                  onChange={handleChangeCheckBox}
                  // onClick={handleShowPassword}
                />
              </div>
              <label htmlFor={'inp_checkBox'} className={cx('savePassLabel')}>
                Nhớ mật khẩu
              </label>
            </div>
          </form>
        )}
        {hasForget && (
          <div className={cx('loginMain')}>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'username'}>
                Nhập tài khoản
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'username'}
                  placeholder='Nhập tài khoản'
                  autocomplete={'username'}
                  value={accountValue}
                  disabled={hasRequest}
                  onChange={(e) => setAccountValue(e)}
                />
              </div>
            </div>
            {/* { && (
              <div className={cx('noitice')}>
                Tài khoản này chưa được đăng ký!
              </div>
            )} */}
            {!hasRequest && !loginFail && forgetUser && forgetUser.email && (
              <>
                <div className={cx('content')}>
                  <label className={cx('fieldContent')} htmlFor={'emailGotten'}>
                    Địa chỉ email của bạn
                  </label>
                  <div className={cx('inputLogin')}>
                    <Input
                      id={'emailGotten'}
                      placeholder='Nhập mã bảo mật'
                      autocomplete={'username'}
                      value={forgetUser.email}
                      disabled
                    />
                  </div>
                </div>
                <div className={cx('noitice', 'success')}>
                  Chúng tôi đã gửi mã xác minh vào địa chỉ email của bạn!
                </div>
                <div className={cx('noitice', 'success')}>
                  *Mã xác minh chỉ được sử dụng trong lần xác minh này*
                </div>
                {hasResend && (
                  <div className={cx('noitice', 'success')}>
                    Mã xác minh đã được gửi lại!
                  </div>
                )}
                <div className={cx('noitice', 'success')}>
                  Vui lòng kiểm tra email!
                </div>
                <div className={cx('content')}>
                  <label className={cx('fieldContent')} htmlFor={'secury'}>
                    Nhập mã xác minh
                  </label>
                  <div className={cx('inputLogin')}>
                    <Input
                      id={'secury'}
                      placeholder='Nhập mã xác minh'
                      autocomplete={'username'}
                      value={''}
                      onChange={(e) => handleChangCapcha(e)}
                    />
                    <IconButton
                      icon={faRotate}
                      size={'small'}
                      className={cx('resetButton')}
                      onClick={handleResendEmail}
                    ></IconButton>
                  </div>
                </div>
              </>
            )}
            {loginFail && (
              <div className={cx('noitice')}>
                Tài khoản này chưa được đăng ký!
              </div>
            )}
            {hasRequest && (
              <div className={cx('noitice', 'success')}>
                Xác nhận thành công!
              </div>
            )}
            {hasRequest && (
              <>
                <div className={cx('content')}>
                  <label className={cx('fieldContent')} htmlFor={'password'}>
                    Mật khẩu mới
                  </label>
                  <div className={cx('inputLogin')}>
                    <Input
                      id={'password'}
                      placeholder={
                        types === 'text' ? 'Nhập mật khẩu' : '******'
                      }
                      value={newPasswordValue}
                      type={types}
                      // icon={faEye}
                      content='Show/Hidden password'
                      autocomplete={'current-password'}
                      onChange={handleSetNewPassword}
                    />
                    <IconButton
                      icon={types === 'text' ? faEyeSlash : faEye}
                      size={'small'}
                      onClick={handleShowPassword}
                    ></IconButton>
                  </div>
                </div>
                <div className={cx('content', passwordwrong && 'warning')}>
                  <label className={cx('fieldContent')} htmlFor={'password2'}>
                    Lặp lại mật khẩu
                  </label>
                  <div className={cx('inputLogin')}>
                    <Input
                      id={'password2'}
                      placeholder={showPassword2 ? 'Nhập mật khẩu' : '******'}
                      value={newPasswordValue2}
                      type={showPassword2 ? 'text' : 'password'}
                      // icon={faEye}
                      content='Show/Hidden password'
                      autocomplete={'current-password'}
                      onChange={handleSetNewPassword2}
                    />
                    <IconButton
                      icon={showPassword2 ? faEyeSlash : faEye}
                      size={'small'}
                      onClick={handleShowPassword2}
                    ></IconButton>
                  </div>
                </div>
                {passwordwrong && (
                  <div className={cx('noitice')}>
                    Vui lòng nhập đúng mật khẩu mới!
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {hasRegis && (
          <div className={cx('loginMain')}>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'firstName'}>
                Nhập tên
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'firstName'}
                  placeholder='Nhập tên'
                  autocomplete={'firstName'}
                  value={newAccount.firstName}
                  onChange={(e) => newCustomer.setFirstName(e)}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'lastname'}>
                Nhập họ đệm
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'lastname'}
                  placeholder='Nhập họ đệm'
                  autocomplete={'lastname'}
                  value={newAccount.lastName}
                  onChange={(e) => newCustomer.setLastName(e)}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'date'}>
                Sinh nhật (tháng/ngày/năm)
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'date'}
                  type='date'
                  value={newCustomer.dateOfBirth}
                  onChange={(e) => newCustomer.setDateOfBirth(new Date(e))}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'email'}>
                Nhập email
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'email'}
                  placeholder='Nhập email'
                  autocomplete={'email'}
                  value={newAccount.email}
                  onChange={(e) => newCustomer.setEmail(e)}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')}>Ảnh</label>
              <div className={cx('inputLogin')}>
                <Image
                  name={'image'}
                  index={-1}
                  src={newCustomer.image ? newCustomer.image : images.noImage}
                  size={'mini'}
                  // onClick={() => console.log(1)}
                  onChange={(val) => newCustomer.setImage(val)}
                />
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'username'}>
                Nhập tài khoản
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'username'}
                  placeholder='Nhập tài khoản'
                  autocomplete={'username'}
                  value={newAccount.username}
                  onChange={(e) => newAccount.setUsername(e)}
                />
              </div>
            </div>

            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'password'}>
                Mật khẩu
              </label>
              <div className={cx('inputLogin')}>
                <Input
                  id={'password'}
                  placeholder={types === 'text' ? 'Nhập mật khẩu' : '******'}
                  value={newAccount.password}
                  type={types}
                  // icon={faEye}
                  content='Show/Hidden password'
                  autocomplete={'current-password'}
                  onChange={(e) => newAccount.setPassword(e)}
                />
                <IconButton
                  icon={types === 'text' ? faEyeSlash : faEye}
                  size={'small'}
                  onClick={handleShowPassword}
                ></IconButton>
              </div>
            </div>
            <div className={cx('content')}>
              <label className={cx('fieldContent')} htmlFor={'password2'}>
                Lặp lại mật khẩu
              </label>
              <div
                className={cx(
                  'inputLogin',
                  passwordValue &&
                    newAccount.password !== passwordValue &&
                    'warning'
                )}
              >
                <Input
                  id={'password2'}
                  placeholder={showPassword2 ? 'Nhập mật khẩu' : '******'}
                  value={passwordValue}
                  type={showPassword2 ? 'text' : 'password'}
                  // icon={faEye}
                  content='Show/Hidden password'
                  autocomplete={'current-password'}
                  onChange={(e) => setPasswordValue(e)}
                />
                <IconButton
                  icon={showPassword2 ? faEyeSlash : faEye}
                  size={'small'}
                  onClick={handleShowPassword2}
                ></IconButton>
              </div>
            </div>
          </div>
        )}

        <div className={cx('loginAction')}>
          <div className={cx('loginButton')}>
            {!hasForget && !hasRegis && (
              <TextButton
                outline
                round
                type={'success'}
                size='large'
                onClick={handleClickLogin}
                hover
              >
                {'Đăng Nhập'}
              </TextButton>
            )}
            {hasForget && !hasRequest && (
              <TextButton
                outline
                round
                type={'success'}
                size='large'
                onClick={handleClickGetNew}
                hover
              >
                {'Lấy lại mật khẩu'}
              </TextButton>
            )}
            {hasForget && hasRequest && !passwordwrong && (
              <TextButton
                outline
                round
                type={'success'}
                size='large'
                onClick={handleChangePassword}
                hover
              >
                {hasRequest ? 'Đổi mật khẩu' : 'Lấy lại mật khẩu'}
              </TextButton>
            )}
            {hasRegis && (
              <TextButton
                outline
                round
                type={'success'}
                size='large'
                onClick={handleClickRegisted}
                hover
              >
                {'Đăng ký'}
              </TextButton>
            )}
            <div className={cx('blankDiv')}></div>
            {!hasRegis && (
              <TextButton
                outline
                round
                type={'warning'}
                size='large'
                onClick={handleReset}
                hover
              >
                {'Nhập Lại'}
              </TextButton>
            )}
          </div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('title')} onClick={handleClickForget}>
            {!hasForget ? 'Quên mật khẩu' : 'Đăng nhập'}
          </div>
          <div className={cx('title')} onClick={handleClickRegis}>
            {!hasRegis ? 'Đăng kí tài khoản' : 'Đăng nhập'}
          </div>
        </div>
      </div>
      {hasCreated && (
        <Msg
          act={'Tạo tài khoản'}
          onAutoClose={() => {
            setCreated(false);
          }}
          status={true}
        />
      )}
      {hasUpdated && (
        <Msg
          act={'Lấy lại tài khoản'}
          onAutoClose={() => {
            setUpdated(false);
          }}
          status={true}
        />
      )}
    </div>
  );
}

export default Login;
