import { useEffect, useState } from 'react';
// import {
//   faPlus,
//   faRotate,
//   //  faUserPlus
// } from '@fortawesome/free-solid-svg-icons';

import { Table, Row, Col } from '~/components/TableComponent';
import ListDetail from './ListDetail';
import Popup from '~/components/PopupComponent';
import ObjectDetails from '~/components/ObjectDetails';
// import TextButton from '~/components/Button/TextButton';
import { getFieldName, checkShowField } from '~/assets/content/';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function List({
  fields,
  datas,
  slug,
  loading,
  orderBy,
  // handleRefreshData,
  level,
  selectedField,
  type,
  onHasAddNewRecord,
  onClickChange,
  onClickDelete,
  onClickRefresh,
  onSelectObject,
  onSortBy,
}) {
  // const [hasRestore, setRestore] = useState(false);
  // const [resetValue, setResetValue] = useState(false);
  const [newShowData, setData] = useState(datas);
  const [newFields, setFields] = useState([]);
  const [newSelectedFields, setSelectedFields] = useState(
    Array.isArray(selectedField) && selectedField.length > 0
      ? selectedField
      : []
  );
  const [hasSelected, setSelected] = useState(false);

  // const [newOrderBy, setOrderBy] = useState({});
  // const [sort, setSort] = useState('');
  // const [order, setOrder] = useState(false);
  // const [addNewRecord, setNewRecord] = useState({});
  // const [blankData, setBlankData] = useState(getClass(loading));
  // console.log('emp ', Data);
  // console.log('blank ', blankData);
  const [viewData, setViewData] = useState({});

  useEffect(() => {
    if (newShowData.length > 0) {
      setFields(Object.keys(newShowData[0]));
    }
  }, [newShowData]);
  // useEffect(() => {
  //   if (orderBy.key) {
  //     setOrderBy(orderBy);
  //   }
  // }, [orderBy]);
  // console.log();
  useEffect(() => {
    if (datas) {
      setData(datas);
    }
  }, [datas]);
  useEffect(() => {
    if (Array.isArray(selectedField)) {
      if (selectedField.length > 0) {
        // console.log('change : ' + type);
        // console.log('selected', selectedField);
        setSelectedFields(selectedField);
        // console.log(selectedField.ID, 'asdasdd : ', datas.ID);
        // selectedField.map((field) => field.ID === datas.ID && setSelect(true));
      }
    }
  }, [selectedField]);

  // truyen data sang ad content :
  useEffect(() => {
    if (hasSelected) {
      return onSelectObject && onSelectObject(newSelectedFields);
    }
    return () => setSelected(false);
  }, [hasSelected, onSelectObject, newSelectedFields]);
  // useEffect(() => {
  //   if (newShowData.length === 0) {
  //     if (datas.length > 0) {
  //       setData(datas);
  //     }
  //   }
  //   return () => {
  //     setRestore(true);
  //   };
  // }, [newShowData, datas]);
  // useEffect(() => {
  //   if (hasRestore) {
  //     setResetValue(true);
  //   }
  //   return () => {
  //     setRestore(false);
  //     setResetValue(false);
  //   };
  // }, [hasRestore]);
  const handleRestore = () => {
    return onClickRefresh();
    // return setRestore(true);
  };

  const handleChange = (data) => {
    // console.log('data : ', data);
    return onClickChange(data);
  };
  const handleClickDelete = (data) => {
    return onClickDelete(data);
  };
  const handleSelectObject = (data) => {
    const index = checkSelectedField(data.ID);
    if (index === -1) {
      setSelectedFields((preData) => [...preData, data]);
    } else {
      newSelectedFields.splice(index, 1);
      console.log('xoa', newSelectedFields);
    }
    return setSelected(true);
  };
  const handleCloseBox = (action) => {
    // if (action === 'add') {
    //   setNewRecord({});
    //   return setBlankData(getClass(loading));
    // }
    if (action === 'view') return setViewData({});
  };
  const handleShowDetail = (data) => {
    setViewData(data);
  };
  const handleSortBy = (field) => {
    // if (sort === field) {
    //   setOrder(true);
    // } else {
    //   setOrder(false);
    //   setSort(field);
    // }
    return onSortBy(field);
  };

  const checkSelectedField = (id) => {
    return newSelectedFields.findIndex((data) => data.ID === id);
  };
  return (
    <>
      {newShowData.length > 0 && (
        <Table>
          <Row header>
            {level < 2 && (
              <Col button='button' header disable>
                {/* <TextButton
                  type={'primary'}
                  size='full'
                  onClick={handleAddNew}
                  radius
                  hover
                >
                  Thêm
                </TextButton> */}
                {''}
              </Col>
            )}
            {newFields.map(
              (field, i) =>
                checkShowField(field, level) && (
                  <Col
                    header
                    disable
                    key={i}
                    icon={
                      orderBy.key === field &&
                      orderBy.key !== 'image' &&
                      (orderBy.val === 1 ? faChevronDown : faChevronUp)
                    }
                    onClick={() => handleSortBy(field)}
                  >
                    {getFieldName(field)}
                    {/* <IconButton icon={faSortUp} hover /> */}
                  </Col>
                )
            )}

            {level < 2 && (
              <Col button='button' colSpan={2} header disable>
                {/* <TextButton
                  type={'warning'}
                  size='full'
                  onClick={handleRestore}
                  radius
                  hover
                >
                  Làm mới
                </TextButton> */}
                {''}
              </Col>
            )}
          </Row>
          {newShowData.map((data, i) => (
            <ListDetail
              // restore={resetValue}
              data={data}
              slug={slug}
              key={i}
              i={i}
              loading={loading}
              level={level}
              selected={checkSelectedField(data.ID) > -1}
              type={type}
              onClickShowDetail={handleShowDetail}
              onClickRefresh={handleRestore}
              onClickChange={handleChange}
              onClickDelete={handleClickDelete}
              onSelectObject={handleSelectObject}
            ></ListDetail>
          ))}
          {/* <Row>
          <Col disable>{'New'}</Col>
          {newFields.map((field, i) => (
            <Col key={i}> </Col>
            ))}
            
            <Col act={true} icon={faUserPlus} onClick={handleRestore} disable>
            {''}
            </Col>
            </Row> */}
        </Table>
      )}
      {/* {addNewRecord.ID && (
        <Popup onClick={() => handleCloseBox('add')}>
          <ObjectDetails
            data={blankData}
            fields={fields}
            action={'add'}
            onClickRefresh={handleRestore}
            onCloseBox={() => handleCloseBox('add')}
            onAddNewRecord={onHasAddNewRecord}
          ></ObjectDetails>
        </Popup>
      )} */}
      {viewData.ID && (
        <Popup onClick={() => handleCloseBox('view')}>
          <ObjectDetails
            data={viewData}
            loading={loading}
            onChange={handleChange}
            onClickRefresh={handleRestore}
            onCloseBox={() => handleCloseBox('view')}
            // onClickSave={handleEdit}
          ></ObjectDetails>
        </Popup>
      )}
    </>
  );
}

export default List;
