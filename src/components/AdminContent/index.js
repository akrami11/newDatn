import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import styles from './AdminContent.module.scss';
// import images from '~/assets/images';

import Input from '~/components/Input';
import IconButton from '~/components/Button/IconButton';
import TextButton from '~/components/Button/TextButton';
import Popup from '~/components/PopupComponent';
import ObjectDetails from '~/components/ObjectDetails';
import List from '~/components/List';
// import Data from '~/assets/db/tables/user';
import { getClass } from '~/assets/content/';

// class Data {
//   ID;
//   Name;
//   DateOfBirth;
//   Sex;
//   Address;
//   Phone;
//   CivilID;
//   Luong;
//   WorkShift;
//   constructor(obj) {
//     this.ID = obj.ID;
//     this.Name = obj.Name;
//     this.DateOfBirth = obj.DateOfBirth;
//     this.Sex = obj.Sex;
//     this.Address = obj.Address;
//     this.Phone = obj.Phone;
//     this.CivilID = obj.CivilID;
//     this.Luong = obj.Luong;
//     this.WorkShift = obj.WorkShift;
//   }
//   set(obj) {
//     this.ID = obj.ID;
//     this.Name = obj.Name;
//     this.DateOfBirth = obj.DateOfBirth;
//     this.Sex = obj.Sex;
//     this.Address = obj.Address;
//     this.Phone = obj.Phone;
//     this.CivilID = obj.CivilID;
//     this.Luong = obj.Luong;
//     this.WorkShift = obj.WorkShift;
//   }
//   setID(val) {
//     return (this.ID = val);
//   }

//   setName(val) {
//     return (this.Name = val);
//   }
//   setDateOfBirth(val) {
//     return (this.DateOfBirth = val);
//   }
//   setSex(val) {
//     return (this.Sex = val);
//   }
//   setAddress(val) {
//     return (this.Address = val);
//   }
//   setPhone(val) {
//     return (this.Phone = val);
//   }
//   setCivilID(val) {
//     return (this.CivilID = val);
//   }
//   setLuong(val) {
//     return (this.Luong = val);
//   }
//   setWorkShift(val) {
//     return (this.WorkShift = val);
//   }
// }

const cx = classNames.bind(styles);

// const FIELDS = [
//   'ID',
//   'Name',
//   'Image',
//   'DateOfBirth',
//   'Sex',
//   'Address',
//   'Phone',
//   'CivilID',
//   'Luong',
//   'WorkShift',
// ];
// const PRE_DATABASE = [
//   {
//     ID: '0001',
//     Name: 'Nguyễn Văn A',
//     DateOfBirth: '1/6/1999',
//     Sex: 'male',
//     Address: 'hbt, ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: 6000000,
//     WorkShift: 1,
//   },
//   {
//     ID: '0002',
//     Name: 'Nguyễn Văn B',
//     DateOfBirth: '10/4/2003',
//     Sex: 'male',
//     Address: 'hbt, ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: 6000000,
//     WorkShift: 1,
//   },
//   {
//     ID: '0003',
//     Name: 'Nguyễn Thị C',
//     DateOfBirth: '7/7/2002',
//     Sex: 'famale',
//     Address: 'ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: 6000000,
//     WorkShift: 1,
//   },
// ];
// const DEFAULT_DATA = {
//   ID: { type: 'String', maxLength: 20, primaryKey: 'true' },
//   Name: { type: 'String', maxLength: 254 },
//   DateOfBirth: { type: 'Date' },
//   Sex: { type: 'String', maxLength: 10 },
//   Address: { type: 'String', maxLength: 254 },
//   Phone: { type: 'String', maxLength: 13 },
//   CivilID: { type: 'String', maxLength: 11 },
//   Luong: { type: 'String', maxLength: 10 },
//   WorkShift: { type: 'String', maxLength: 1 },
// };
// const newwwww = [
//   {
//     Name: 'Nguyễn Văn A',
//     DateOfBirth: '1/6/1999',
//     Sex: 'male',
//     Address: 'hbt, ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: '6000000',
//     WorkShift: '1',
//   },
//   {
//     Name: 'Nguyễn Văn B',
//     DateOfBirth: '10/4/2003',
//     Sex: 'male',
//     Address: 'hbt, ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: '6000000',
//     WorkShift: '1',
//   },
//   {
//     Name: 'Nguyễn Thị C',
//     DateOfBirth: '7/7/2002',
//     Sex: 'famale',
//     Address: 'ha noi',
//     Phone: '0123456789',
//     CivilID: '001004015032',
//     Luong: '6000000',
//     WorkShift: '1',
//   },
// ];

function Content({
  level,
  page,
  slug,
  orderBy,
  baseDatas,
  onHandleEdit,
  onDeleteData,
  onResetData,
  onChangeData,
  onSortBy,
  ...props
}) {
  // const [User] = useState(new Data());
  // const [newUser] = useState(User.getData());
  // const [requests, setRequests] = useState([]);

  const [datas, setDatas] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [deleteValue, setDeleteValue] = useState();

  const [hasClickedSearchButton, setClickedSearchButton] = useState(false);
  // const [datas, setDatas] = useState([]);
  const [pages, setPages] = useState(0);
  const [paging, setPaging] = useState(1);
  const [showData, setShowData] = useState([]);
  const [newSearchValue, setNewSearchValue] = useState('');
  const [fields, setFields] = useState([]);

  const [addNewRecord, setNewRecord] = useState({});
  const [blankData, setBlankData] = useState(getClass(page));
  // const fields = FIELDS;

  //set state for show search box :
  const [showSearchBox, setShowSearchBox] = useState(true);
  const [showBaseData, setShowBaseData] = useState(false);
  // set state for slug = "workshift"
  const [selectForWorkshift, setSelectForWorkshift] = useState(true);
  // // save obj record to update :
  const [objectUpdate, setObjectToUpdateSchedule] = useState([]);
  // // check show update box :
  const [hasSelected, setSelect] = useState(false);
  // //save date :
  const [scheduleFrom, setScheduleFrom] = useState(new Date());
  const [scheduleTo, setScheduleTo] = useState(new Date());
  const [shiftUpdate, setShiftUpdate] = useState('');
  //set effect when base data and page change
  useEffect(() => {
    if (Array.isArray(baseDatas)) {
      if (baseDatas.length > 0) {
        const newDatas = baseDatas.map((data) => getClass(page, data));
        setFields(Object.keys(baseDatas[0]));
        setShowData([]);
        console.log('content : ', baseDatas);
        return setDatas(newDatas);
      } else {
        setFields([]);
        setShowData([]);
        console.log('content : ', baseDatas);
        return setDatas([]);
      }
    } else {
      setFields([]);
      setShowData([]);
      console.log('content : ', baseDatas);
      return setDatas([]);
    }
  }, [baseDatas, page]);

  // set effect data showing when pagination if data is available
  useEffect(() => {
    if (datas.length > 0) {
      setPages(Math.ceil(datas.length / 8));
    }
  }, [datas]);
  useEffect(() => {
    if (paging) {
      if (datas.length > 0) {
        setShowData([]);
        datas.map((data, index) => {
          if (index >= (paging - 1) * 8 && index < paging * 8) {
            return setShowData((preData) => [...preData, data]);
          } else return 1;
        });
      } else setShowData([]);
    }
  }, [paging, datas]);
  //set effect when searching
  useEffect(() => {
    if (hasClickedSearchButton) {
      if (newSearchValue) {
        setPaging(1);
        if (baseDatas.length > 0) {
          setDatas([]);
          console.log(newSearchValue);
          baseDatas.map((data) => {
            if (data.find(newSearchValue)) {
              return setDatas((preData) => [...preData, data]);
            } else return 1;
          });
        }
      }
    }
    return () => setClickedSearchButton(false);
  }, [newSearchValue, baseDatas, hasClickedSearchButton]);
  // console.log(datas);

  //set effect when slug="workshift" and select obj change:
  useEffect(() => {
    if (slug === 'workshift') {
      setShowSearchBox(!selectForWorkshift);
      setShowBaseData(true);

      // console.log(selectForWorkshift);
    }
  }, [selectForWorkshift, slug]);

  // shift update change :
  useEffect(() => {
    if (shiftUpdate) {
      if (scheduleFrom && scheduleTo) {
        objectUpdate.map((obj) =>
          obj.changeSchedule(scheduleFrom, scheduleTo, shiftUpdate)
        );
      }
    }
  });

  const countPages = (page) => {
    let newArray = [];
    if (page > 0) {
      for (let index = 0; index < page; index++) {
        newArray.push(index + 1);
      }
    }
    return newArray;
  };
  const handleClickChange = (val) => {
    onHandleEdit(true);
    console.log('val', val);
    return onChangeData(val);
  };
  const handleClickDelete = (data) => {
    setShowDeleteBox(true);
    console.log(data);
    return setDeleteValue(data);
  };
  const handleConfirmDelete = () => {
    const newDelete = getClass(page);
    newDelete.setID(deleteValue.ID);
    handleRefreshData();
    setShowDeleteBox(false);
    setDeleteValue();
    return onDeleteData(newDelete);
    // newDelete.destroy();
    // // request
    // //   .delete('/account/delete/' + deleteValue)
    // //   .catch((err) => console.log('Error : ', err));
    // setShowDeleteBox(false);
    // return () => handleRefreshData();

    // return setGetNewData(true);
  };
  const handleCloseBox = (action) => {
    if (action === 'add') {
      setNewRecord({});
      return setBlankData(getClass(page));
    }
    setSelect(false);
    return setShowDeleteBox(false);
  };
  // const handleClickChange = (data) => {
  //   return request
  //     .post('user/update/' + data.ID, data)
  //     .then(() => {
  //       return console.log('Update success!');
  //     })
  //     .catch(() => {
  //       return console.log('Update failed!');
  //     });
  // };
  const handleRefreshData = async () => {
    return await onResetData();
  };
  const handleChoosePage = (page) => {
    if (page >= pages) {
      setPaging(pages);
    } else if (page <= 1) {
      setPaging(1);
    } else setPaging(page);
  };
  const handleClickSearchButton = () => {
    return setClickedSearchButton(true);
  };
  const handleGetNewRequest = () => {
    return handleRefreshData();
  };
  const handleSelectType = (e) => {
    if (e === 'true') {
      setSelectForWorkshift(true);
    } else setSelectForWorkshift(false);
  };
  const handleClickUpdateButton = () => {
    // setObjectToUpdateSchedule(showData);
    setShowBaseData(false);
    return setSelect(true);
  };
  const handleSelectObject = (data) => {
    return setObjectToUpdateSchedule(data);
  };
  const DeleteBox = () => {
    return (
      <div className={cx('mainBox')}>
        <div className={cx('boxTitle')}>
          <div>Bạn chắc chắn xóa ?</div>
          <div className={cx('boxTitleCancelButton')} onClick={handleCloseBox}>
            <IconButton icon={faXmark} hover />
          </div>
        </div>
        <div className={cx('deleteDetails')}>
          <span>ID : {deleteValue.ID}</span>
          <span>
            Họ tên : {deleteValue.lastName} {deleteValue.firstName}
          </span>
        </div>
        <div className={cx('footerBox')}>
          <TextButton
            type={'warning'}
            size='mini'
            onClick={handleConfirmDelete}
            radius
            hover
          >
            Xóa
          </TextButton>
          <TextButton
            type={'primary'}
            size='mini'
            onClick={handleCloseBox}
            radius
            hover
          >
            Cancel
          </TextButton>
        </div>
      </div>
    );
  };
  const PagineButton = () => {
    return (
      <div className={cx('btnbtn')}>
        {datas.length > 5 && (
          <div className={cx('pagingButton')}>
            <IconButton
              type={''}
              outline
              icon={faAnglesLeft}
              size='normal'
              onClick={() => handleChoosePage(1)}
              hover
            />
          </div>
        )}
        <div className={cx('pagingButton')}>
          <IconButton
            type={''}
            outline
            size='normal'
            icon={faAngleLeft}
            onClick={() => handleChoosePage(paging - 1)}
            hover
          />
        </div>
        {countPages(pages).map((dt) => (
          <div className={cx('pagingButton')} key={dt}>
            <TextButton
              outline
              type={dt === paging && 'primary'}
              size='normal'
              onClick={() => handleChoosePage(dt)}
              hover
            >
              {dt}
            </TextButton>
          </div>
        ))}
        <div className={cx('pagingButton')}>
          <IconButton
            type={''}
            outline
            icon={faAngleRight}
            size='normal'
            onClick={() => handleChoosePage(paging + 1)}
            hover
          />
        </div>
        {datas.length > 5 && (
          <div className={cx('pagingButton')}>
            <IconButton
              type={''}
              outline
              size='normal'
              icon={faAnglesRight}
              onClick={() => handleChoosePage(pages)}
              hover
            />
          </div>
        )}
      </div>
    );
  };
  const handleAddNew = () => {
    return setNewRecord({ ID: 1 });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('headerContent')}>
        <div className={cx('leftHeader')}>
          {slug === 'workshift' && (
            <div className={cx('leftHeaderContent')}>
              Chọn :{' '}
              <select
                name='slcWork'
                id=''
                className={cx('select')}
                onChange={(e) => handleSelectType(e.target.value)}
              >
                <option value={true}>Tất cả mọi người</option>
                <option value={false}>Cá nhân</option>
              </select>
            </div>
          )}
          {(slug !== 'workshift' || !selectForWorkshift) && (
            <>
              <div className={cx('search')}>
                <Input
                  value={''}
                  round
                  outline
                  onChange={(val) => setNewSearchValue(val)}
                  placeHolder='Nhập thông tin tìm kiếm'
                ></Input>
              </div>
              <TextButton
                type={'primary'}
                size={'mini'}
                onClick={handleClickSearchButton}
                radius
                hover
              >
                Search
              </TextButton>
            </>
          )}
        </div>
        <div className={cx('rightHeader')}>
          <div className={cx('rightButton')}>
            {slug !== 'deleted' && slug !== 'workshift' && (
              <TextButton
                type={'primary'}
                size='large'
                onClick={handleAddNew}
                radius
                hover
              >
                Thêm
              </TextButton>
            )}
          </div>
          {slug === 'deleted' && (
            <>
              <div className={cx('rightButton')}>
                <TextButton
                  type={'success'}
                  size='large'
                  onClick={handleAddNew}
                  radius
                  hover
                >
                  Khôi phục tất cả
                </TextButton>
              </div>
              <div className={cx('rightButton')}>
                <TextButton
                  type={'danger'}
                  size='large'
                  onClick={handleAddNew}
                  radius
                  hover
                >
                  Xóa tất cả
                </TextButton>
              </div>
            </>
          )}
          {slug === 'workshift' && (
            <div className={cx('rightButton')}>
              <TextButton
                type={'primary'}
                size='large'
                onClick={handleClickUpdateButton}
                radius
                hover
              >
                Cập nhật lịch làm việc
              </TextButton>
            </div>
          )}
          <div className={cx('rightButton')}>
            <TextButton
              type={'warning'}
              size='large'
              onClick={handleRefreshData}
              radius
              hover
            >
              Làm mới
            </TextButton>
          </div>
        </div>
      </div>

      {/* show list object if slug != "workshift" */}
      {(slug !== 'workshift' || (showSearchBox && showBaseData)) &&
        !hasSelected && (
          <>
            <List
              fields={fields}
              datas={showData}
              orderBy={orderBy}
              page={paging}
              slug={slug}
              level={level}
              loading={page}
              onSortBy={onSortBy}
              baseID='main'
              selectedField={objectUpdate}
              onHasAddNewRecord={handleGetNewRequest}
              onClickRefresh={handleRefreshData}
              onClickChange={handleClickChange}
              onClickDelete={handleClickDelete}
              onSelectObject={handleSelectObject}
            />
            {datas.length >= 8 && <PagineButton></PagineButton>}
          </>
        )}

      {slug === 'workshift' && showSearchBox && objectUpdate.length > 0 && (
        <List
          fields={fields}
          datas={objectUpdate}
          orderBy={orderBy}
          page={paging}
          slug={slug}
          level={level}
          loading={page}
          onSortBy={onSortBy}
          selectedField={objectUpdate}
          type={'selected'}
          onHasAddNewRecord={handleGetNewRequest}
          onClickRefresh={handleRefreshData}
          onClickChange={handleClickChange}
          onClickDelete={handleClickDelete}
          onSelectObject={handleSelectObject}
        />
      )}

      {/* show update holiday day or change work schedule for staff : */}
      {hasSelected && (
        <Popup onClick={() => handleCloseBox()}>
          <div className={cx('scheduleBox')}>
            <div>Sửa lịch làm việc từ ngày : </div>
            <Input
              type='date'
              value={scheduleFrom}
              onChange={setScheduleFrom}
            ></Input>
            <div>đến ngày : </div>
            <Input
              type='date'
              value={scheduleTo}
              onChange={setScheduleTo}
            ></Input>
            <div>chọn ca làm</div>
            <div>
              <select
                name='slcShift'
                id=''
                className={cx('select')}
                onChange={(e) => setShiftUpdate(e.target.value)}
              >
                <option value={0}>Tất cả</option>
                <option value={1}>Ca 1</option>
                <option value={2}>Ca 2</option>
              </select>
            </div>
          </div>
        </Popup>
      )}

      {/* error data : */}
      {!showData.length && <div>Không có dữ liệu cần tìm</div>}
      {/* delete object : */}
      {showDeleteBox && (
        <Popup onClick={handleCloseBox}>
          <DeleteBox></DeleteBox>
        </Popup>
      )}
      {/* add new object */}
      {addNewRecord.ID && (
        <Popup onClick={() => handleCloseBox('add')}>
          <ObjectDetails
            data={blankData}
            fields={fields}
            action={'add'}
            loading={page}
            onClickRefresh={handleRefreshData}
            onCloseBox={() => handleCloseBox('add')}
            // onAddNewRecord={onHasAddNewRecord}
          ></ObjectDetails>
        </Popup>
      )}
    </div>
  );
}

export default Content;
