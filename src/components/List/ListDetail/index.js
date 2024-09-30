import { useEffect, useState } from 'react';
import { Row, Col } from '~/components/TableComponent';
// import Data from '~/assets/db/tables/user';
// import Popup from '~/components/PopupComponent';
// import ObjectDetails from '~/components/ObjectDetails';
import TextButton from '~/components/Button/TextButton';
import {
  checkShowField,
  getClass,
  // getPrice,
  setPrice,
} from '~/assets/content/';
// import request from '~/utils/request';

// const getTimeFromDate = (str) => {
//   const newDate = new Date(str);
//   const newBirthDay =
//     newDate.getDate() +
//     '-' +
//     (newDate.getMonth() + 1) +
//     '-' +
//     newDate.getFullYear();
//   return newBirthDay;
// };

export default function Detail({
  restore,
  data,
  slug,
  i,
  level,
  loading,
  selected,
  type,
  onClickChange,
  onClickDelete,
  onSelectObject,
  onClickRefresh,
  onClickShowDetail,
}) {
  const [preData] = useState(data);
  const [newId] = useState({ ID: preData.ID });
  const [value, setValue] = useState(getClass(loading));
  // console.log('val : ', loading);
  // console.log('val : ', getClass(  loading, { ID: '001' }));
  // const [showDetails, setShowDetails] = useState({});
  // if (data.Image) {
  //   console.log(data.Image);
  // }
  // console.log(value);
  const [newData, setNewData] = useState(getClass(loading));
  const ArrayData = { keys: Object.keys(data), values: Object.values(data) };
  const [newRestored, setRestored] = useState(false);
  const [editData, setEditData] = useState();

  // getTimeFromDate(data.Name);
  useEffect(() => {
    if (data) {
      setRestored(true);
    }
  }, [data]);

  useEffect(() => {
    if (newRestored) {
      const newObject = getClass(loading);
      setNewData(newObject);
      setValue(getClass(loading));
      setRestored(false);
    }
  }, [newRestored, loading]);
  // useEffect(() => {
  //   if (newRestored) {
  //     const newObject = getClass(  loading,);
  //     setNewData(newObject);
  //     setValue(getClass(  loading,));
  //     setRestored(false);
  //   }
  // }, [newRestored, data, newId]);
  useEffect(() => {
    if (!value.ID) {
      value.setID(newId.ID);
    }
  }, [value, newId]);
  useEffect(() => {
    if (newData.ID) {
      if (!newData.checkDataChanged(data)) {
        setNewData({});
      }
    }
  }, [newData, data]);
  const handleChange = (val, field) => {
    const newValue = field === 'salary' ? setPrice(val) : val;
    // console.log('newvalue', setPrice(val));
    // console.log('val : ', val);
    value.change(field, newValue);
    console.log('val : ', value);
    if (newData.ID) {
      if (value.checkDataChanged(data)) {
        setNewData(value);
      } else {
        setNewData(getClass(loading));
      }
    } else {
      setNewData(value);
    }
  };
  const handleClickDelete = () => {
    return onClickDelete(data);
  };
  const handleSelectObject = () => {
    return onSelectObject(data);
  };
  const handleEdit = () => {
    setEditData('');
    console.log('check valid : ', newData);
    // if (newData && newData.checkValid()) {
      // console.log('dt : ', newData);
      return onClickChange(newData);
    // }
  };
  const handleClickShowUserDetails = () => {
    return onClickShowDetail(data);
    // return onClickShowUser(data);
  };
  const handleRestoreData = () => {
    const restoreData = data.getNew();
    restoreData.setID(data.ID);
    restoreData.setRestore();
    return onClickChange(restoreData);
  };
  // const handleCloseBox = () => {
  //   return setShowDetails({});
  // };
  return (
    <>
      <Row key={i}>
        {level < 2 && (
          <Col
            restore={newRestored}
            // icon={faUser}
            button='button'
            // act={true}
            disable
          >
            <TextButton
              type={'info'}
              size='full'
              onClick={handleClickShowUserDetails}
              radius
              hover
            >
              Xem
            </TextButton>
          </Col>
        )}
        {ArrayData.keys.map(
          (dt, index) =>
            checkShowField(dt, level) && (
              <Col
                key={index}
                restore={newRestored}
                // disable={dt === 'ID' ? true : false}
                disable={!editData ? true : dt === 'ID' ? true : false}
                index={i}
                fieldName={dt}
                typeId={type}
                after={dt === 'salary' && 'true'}
                // type={dt === 'Sex' ? 'checkBox' : dt === 'DateOfBirth' ? 'date' : ''}
                handleChangeValue={(val) => handleChange(val, dt)}
              >
                {/* {dt === 'salary'
                  ? getPrice(ArrayData.values[index])
                  :  */}
                {ArrayData.values[index]}
              </Col>
            )
        )}
        {level < 2 && slug !== 'workshift' && (
          <Col
            restore={newRestored}
            button='button'
            // act={newData.ID ? true : false}
            disable
            // onClick={() => handleClickDelete(data.ID)}
          >
            {slug !== 'deleted' && (
              <TextButton
                type={editData ? 'success' : 'warning'}
                size='full'
                radius
                hover
                onClick={() => {
                  editData ? handleEdit() : setEditData(data.ID);
                }}
              >
                {editData ? 'Lưu' : 'Sửa'}
              </TextButton>
            )}
            {slug === 'deleted' && (
              <TextButton
                type={'success'}
                size='full'
                radius
                hover
                onClick={handleRestoreData}
              >
                {'Khôi phục'}
              </TextButton>
            )}
          </Col>
        )}
        {level < 2 && slug !== 'workshift' && (
          <Col
            restore={newRestored}
            button='button'
            // act={newData.ID ? true : false}
            disable
            // onClick={() => handleClickDelete(data.ID)}
          >
            <TextButton
              type={'danger'}
              size='full'
              onClick={handleClickDelete}
              radius
              hover
            >
              Xóa
            </TextButton>
          </Col>
        )}
        {level < 2 && slug === 'workshift' && (
          <Col
            restore={newRestored}
            button='button'
            // act={newData.ID ? true : false}
            disable
            colSpan='2'
            // onClick={() => handleClickDelete(data.ID)}
          >
            {type !== 'selected' ? (
              !selected ? (
                <TextButton
                  type={'success'}
                  size='full'
                  onClick={handleSelectObject}
                  radius
                  hover
                >
                  Chọn
                </TextButton>
              ) : (
                ' '
              )
            ) : (
              <TextButton
                type={'danger'}
                size='full'
                onClick={handleSelectObject}
                radius
                hover
              >
                Xóa
              </TextButton>
            )}
          </Col>
        )}
      </Row>
    </>
  );
}
