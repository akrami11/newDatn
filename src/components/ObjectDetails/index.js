import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ObjectDetails.module.scss';

import request from '~/utils/request';
import images from '~/assets/images';
import { getFieldName, checkShowField } from '~/assets/content';
import Account from '~/assets/db/tables/account.js';
import Image from '~/components/Image';
import Input from '~/components/Input';
import EditableInput from '~/components/EditableInput';
import TextButton from '~/components/Button/TextButton';
const cx = classNames.bind(styles);

const checkOutputField = (val) => {
  switch (val) {
    case '_id':
      return false;
    case 'ID':
      return false;
    case 'AID':
      return false;
    case 'image':
      return false;
    case 'account':
      return false;
    case 'views':
      return false;
    default:
      return checkShowField(val);
  }
};
const checkOutputData = (val) => {
  switch (val) {
    case '_id':
      return false;
    case 'ID':
      return false;
    case 'image':
      return false;
    // case 'account':
    //   return false;
    case 'sex':
      return false;
    case 'dateOfBirth':
      return false;
    case 'file':
      return false;
    case 'views':
      return false;
    default:
      return checkShowField(val);
  }
};
const checkShowAccountInput = (val) => {
  switch (val) {
    case 'user':
      return true;
    case 'customer':
      return true;
    default:
      return false;
  }
};

function ObjectDetails({
  data,
  fields,
  action,
  onCloseBox,
  loading,
  onClickRefresh,
  edit,
  onClickSave,
  onChange,
  onAddNewRecord,
}) {
  const [page] = useState(loading);
  const [disable, setDisable] = useState(action === 'add' ? false : true);
  const [dataDetail] = useState(data.getNew());
  // console.log('dataDetail : ', dataDetail, data);
  const [preData] = useState(data);
  // const [newFields] = useState(preData.set({}));
  const [counted, setCounted] = useState(false);
  const [account, setAccount] = useState(
    new Account({
      pagename: '',
      password: '',
      level: '',
    })
  );
  const [uploadFile, setUploadFile] = useState();
  const [preAccount, setPreAccount] = useState(new Account());
  const [getAccountFailed, setGetAccountFailed] = useState(false);
  // const [newValue] = useState(new Account());
  const [ArrayData] = useState(
    preData.ID
      ? { keys: Object.keys(data), values: Object.values(data) }
      : { keys: fields, values: [] }
  );
  const ArrayAccount = {
    keys: Object.keys(account),
    values: Object.values(account),
  };
  const [newSex, setSex] = useState(data.sex === 'male' ? true : false);
  // console.log(dataDetail);
  // useEffect(() => {
  // }, [dataDetail]);

  // auto increase ID
  useEffect(() => {
    if (!dataDetail.ID) {
      if (action && !counted) {
        request
          .get(page + '/getLastRecord')
          .then((res) => {
            const counter = Number(res.data.ID) + 1;
            if (page === 'customer') {
              if (counter < 10) {
                dataDetail.setID('000' + counter);
              } else if (counter < 100) {
                dataDetail.setID('00' + counter);
              } else if (counter < 1000) {
                dataDetail.setID('0' + counter);
              } else {
                dataDetail.setID(counter.toString());
              }
              // console.log('cus', dataDetail);
            } else {
              if (counter < 10) {
                dataDetail.setID('00' + counter);
              } else if (counter < 100) {
                dataDetail.setID('0' + counter);
              } else {
                dataDetail.setID(counter.toString());
              }
            }
            setCounted(true);
          })
          .catch(() => {
            return 1;
          });
      } else if (preData) {
        dataDetail.setID(preData.ID);
      }
    }
  }, [page, action, counted, dataDetail, loading, preData]);
  // find account info
  useEffect(() => {
    if (!getAccountFailed && !action && data.ID) {
      if (!account.AID) {
        request
          .post('get', { AID: data.ID })
          .then((res) => {
            const newAccount = new Account(res.data);
            // console.log(newAccount);
            setPreAccount(newAccount);
            return setAccount(newAccount);
          })
          .catch(() => {
            return setGetAccountFailed(true);
          });
      }
    }
    return () => setGetAccountFailed(true);
  }, [getAccountFailed, action, account, data]);

  const handleChangeSex = () => {
    dataDetail.change('sex', !newSex);
    return setSex(!newSex);
  };
  const handleChange = (val, dt) => {
    // console.log(dataDetail);
    return dataDetail.change(dt, val);
  };
  const handleChangeAccount = (val, dt) => {
    return account.change(dt, val);
  };
  const handleSave = () => {
    if (!action) {
      if (dataDetail.checkDataChanged(preData)) {
        dataDetail.update();
      }
      if (account.checkDataChanged(preAccount)) {
        if (preAccount.checkValid()) {
          account.update();
        } else if (account.checkValid()) {
          account.setAID(dataDetail.ID);
          account.create();
        }
      }
      return handleCloseBox();
    } else {
      if (dataDetail.checkValid()) {
        if (loading === 'lightnovel') {
          dataDetail.setViews(0);
        }
        dataDetail.create();
        // addNewAccount();
        // addNewRecord();
        // handleCloseBox();
        // onAddNewRecord();
      }
      if (account.checkValid()) {
        account.setAID(dataDetail.ID);
        account.create();
      }
      return handleCloseBox();
    }
    // console.log(data.ID);
  };

  const variableToString = (val) => {
    if (typeof val !== 'string') {
      let newStr = '';
      const str = newStr.concat(val);
      return str.toString();
    } else return val;
  };

  const handleEditValue = () => {
    return setDisable(false);
  };
  const handleCloseBox = () => {
    onClickRefresh();
    return onCloseBox();
  };
  const CheckBoxInput = () => {
    return (
      <div
        className={cx('boxInput')}
        onClick={() => {
          if (!disable) handleChangeSex();
        }}
      >
        <input
          type={'checkBox'}
          id={data.ID}
          disabled={disable}
          checked={newSex}
          onChange={handleChangeSex}
        />
        <label htmlFor={data.ID}>{newSex ? 'Nam' : 'Nữ'}</label>
      </div>
    );
  };
  const FileInput = (data) => {
    return (
      <>
        <input
          type='file'
          style={{ display: 'none', width: '100%' }}
          id={'file_inp'}
          onChange={handleUploadFile}
          disabled={disable}
        />
        <label
          htmlFor={'file_inp'}
          style={{ width: '100%', wordBreak: 'break-word', cursor: 'pointer' }}
        >
          {uploadFile ? uploadFile.name : data ? data : 'Chọn file : .txt'}
        </label>
      </>
      // <Input type={'file'} id={index + '_file'} label={children.name}></Input>
    );
  };
  const handleUploadFile = (e) => {
    setUploadFile(e.target.files[0]);
    handleChange(e.target.files[0], 'file');
  };
  const DateInput = (date, data) => {
    return (
      <Input
        type='date'
        disabled={disable}
        value={date}
        onChange={(val) => handleChangeData(val, data)}
      />
    );
  };
  const handleChangeData = (val, data) => {
    return handleChange(new Date(val), data);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('image')}>
          <Image
            name={'image'}
            disabled={disable}
            index={-1}
            src={data.image ? data.image : images.noImage}
            size={'normal'}
            // onClick={() => console.log(1)}
            onChange={(val) => handleChange(val, 'image')}
          />
        </div>
        <div className={cx('details')}>
          <div className={cx('main')}>
            <div className={cx('head')}>
              <div className={cx('title')}>
                {action === 'add'
                  ? 'Nhập thông tin mới :'
                  : 'Thông tin chi tiết :'}
              </div>
            </div>
            <div className={cx('body')}>
              {ArrayData.keys.map((dt, index) => (
                <div className={cx('field')} key={index}>
                  {checkOutputField(dt) && (
                    <div className={cx('label')}>
                      <div className={cx('labelTitle')}>{getFieldName(dt)}</div>
                      <div className={cx('labelTitle')}>:</div>
                    </div>
                  )}
                  {checkOutputData(dt) && (
                    <div className={cx('prop')}>
                      {ArrayData.values[index] ? (
                        <EditableInput
                          baseValue={variableToString(ArrayData.values[index])}
                          onChange={(val) => handleChange(val, dt)}
                          replace={'Nhập thông tin'}
                          noBackground
                          disabled={disable}
                        />
                      ) : (
                        <Input
                          disabled={disable}
                          value={''}
                          onChange={(val) => handleChange(val, dt)}
                          placeHolder={'Nhập thông tin'}
                        ></Input>
                      )}
                    </div>
                  )}
                  {dt === 'file' && (
                    <div className={cx('prop')}>
                      {FileInput(ArrayData.values[index])}
                    </div>
                  )}
                  {dt === 'sex' && (
                    <div className={cx('prop')}>
                      <CheckBoxInput />
                    </div>
                  )}
                  {dt === 'dateOfBirth' && (
                    <div className={cx('prop')}>
                      {DateInput(ArrayData.values[index], dt)}
                    </div>
                  )}
                </div>
              ))}

              {!edit &&
                checkShowAccountInput(loading) &&
                (getAccountFailed || !disable) &&
                ArrayAccount.keys.map(
                  (dt, index) =>
                    checkOutputField(dt) && (
                      <div className={cx('field')} key={index}>
                        <div className={cx('label')}>
                          <div className={cx('labelTitle')}>
                            {getFieldName(dt)}
                          </div>
                          <div className={cx('labelTitle')}>:</div>
                        </div>
                        <div className={cx('prop')}>
                          {ArrayAccount.values[index] ? (
                            <EditableInput
                              baseValue={
                                dt === 'password'
                                  ? '********'
                                  : variableToString(ArrayAccount.values[index])
                              }
                              onChange={(e) => handleChangeAccount(e, dt)}
                              replaceAll={true}
                              replace={'Nhập thông tin'}
                              noBackground
                              disabled={disable}
                              type={'date'}
                            />
                          ) : (
                            <Input
                              disabled={disable}
                              value={''}
                              onChange={(e) => handleChangeAccount(e, dt)}
                              placeHolder={'Nhập thông tin'}
                            ></Input>
                          )}
                        </div>
                      </div>
                    )
                )}
            </div>
            <div className={cx('footer')}>
              {!disable && (
                <div className={cx('footerButton')}>
                  <TextButton
                    type={'success'}
                    size='mini'
                    onClick={handleSave}
                    radius
                    hover
                  >
                    {action === 'add' ? 'Thêm' : 'Lưu'}
                  </TextButton>
                </div>
              )}
              {disable && (
                <div className={cx('footerButton')}>
                  <TextButton
                    type={'primary'}
                    size='mini'
                    onClick={handleEditValue}
                    radius
                    hover
                  >
                    Sửa
                  </TextButton>
                </div>
              )}
              <div className={cx('footerButton')}>
                <TextButton
                  type={'warning'}
                  size='mini'
                  onClick={handleCloseBox}
                  radius
                  hover
                >
                  Cancel
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjectDetails;
