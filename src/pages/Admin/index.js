import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
//
import styles from './Admin.module.scss';
import DefaultPage from '~/pages/Admin/DefaultPage';
import Content from '~/components/AdminContent';
// import Image from '~/components/Image';
import request from '~/utils/request';
import images from '~/assets/images';
import { getClass } from '~/assets/content/';
// import Data from '~/assets/db/tables/user';
// import Data from '~/assets/db/tables/user';
// import Input from '~/components/Input';

const cx = classNames.bind(styles);
// const newMainSidebar = {
//   ID: 5,
//   Name: 'customer',
//   Title: 'Quản lý khách hàng',
//   to: '/admin/customer',
//   icon: 'faUserCircle',
//   children: null,
//   Type: 'Sidebar',
//   ShowTime: new Date(),
//   level: 0,
// };
// content: 'customer',
// title: 'Quản lý khách hàng',
// icon: faUserCircle,
function Admin({ ...props }) {
  const { page, slug } = useParams();
  // const { slug } = useParams();
  // console.log('slug : ', page);
  // const [page, setPage] = useState(pages ? pages : '');
  const [hasEdited, setHasEdited] = useState(false);
  const [editData, setEditData] = useState([]);
  const [orderBy, setOrderBy] = useState({});
  const [newSlug, setSlug] = useState('');
  // const [getDatas, setDatas] = useState([]);
  const [user] = useState(() => {
    if (localStorage.getItem('login')) {
      const newUser = JSON.parse(localStorage.getItem('login'));
      return newUser;
    } else return 0;
  });
  const classes = cx('wrapper');
  const [datas, setDatas] = useState([]);
  const [resetData, setReset] = useState(false);
  const [sort, setSort] = useState(getClass(page));

  //set slug if slug indentified :
  useEffect(() => {
    if (slug) {
      // console.log('slug : ', slug);
      setSlug(slug);
      setReset(true);
    } else {
      setSlug('');
      setReset(true);
    }
  }, [slug]);

  // get class by page :
  useEffect(() => {
    if (page) {
      setReset(true);
      setSort(getClass(page));
    }
    return () => setReset(false);
  }, [page]);

  // get show data from api
  useEffect(() => {
    if (resetData && page) {
      console.log('Get data from ' + page + '/' + newSlug);
      const timeOut = setTimeout(() => {
        request
          .get(page + '/' + newSlug)
          .then((req) => {
            // console.log(req);
            const newRequest = req.data.map((data) => {
              const newObject = getClass(page, data);
              if (data.deletedAt) {
                newObject.setDeletedTime(data.deletedAt);
              }
              return newObject;
            });
            const newDatas = newRequest.map((data) => {
              if (!data.image) {
                data.setImage(images.noImage);
              } else
                data.setImage('http://localhost:3001/public/' + data.image);

              return data;
            });
            setReset(false);
            return setDatas(newDatas);
          })
          .catch((err) => {
            console.log('Error : ', err);
            return setDatas([]);
          });
      }, 1000);

      // getData(page);
      return () => clearTimeout(timeOut);
    }
  }, [datas, resetData, page, newSlug]);

  // useEffect(() => {
  //   console.log(datas);
  // }, [datas]);

  // get sort data
  useEffect(() => {
    if (page) {
      if (sort) {
        setOrderBy({ key: Object.keys(sort)[0], val: Object.values(sort)[0] });
        if (sort.checkValid()) {
          request
            .post(page + '/sort', sort)
            .then((req) => {
              const newRequest = req.data.map((data) => getClass(page, data));
              const newDatas = newRequest.map((data) => {
                if (!data.image) {
                  data.setImage(images.noImage);
                } else
                  data.setImage('http://localhost:3001/public/' + data.image);
                return data;
              });
              return setDatas(newDatas);
            })
            .catch((err) => console.log('Error : ', err));
        }
      }
    }
  }, [sort, page]);

  // useEffect(() => {
  //   if (props.page) {
  //     setPage(props.page);
  //   }
  // }, [props.page]);
  useEffect(() => {
    if (hasEdited) {
      if (editData.checkValid()) {
        console.log('pre pre : ', editData);
        editData.update();
        setEditData([]);
        setHasEdited(false);
        setReset(true);
      }
    }
  }, [hasEdited, editData]);

  // useEffect(() => {
  //   if (getDatas.length === 0) {
  //     request
  //       .get('user')
  //       .then((res) => {
  //         setDatas(res.data);
  //       })
  //       .catch(() => {
  //         return 1;
  //       });
  //   }
  // }, [getDatas]);
  // useEffect(() => {
  //   console.log(getDatas);
  // }, [getDatas]);
  // console.log(props.page);
  // const handleTest = () => {
  //   request
  //     .post('interface/create', newMainSidebar)
  //     .then(() => console.log('success'))
  //     .catch(() => console.log('fail'));
  // };
  const handleResetData = () => {
    return setReset(true);
  };
  const handleOnEdit = (val) => {
    return setHasEdited(val);
  };
  const handleDeleteData = (data) => {
    handleResetData();
    return data.destroy();
  };
  const handleSortBy = (field) => {
    setOrderBy(field);
    const newObject = getClass(page);
    newObject.change(field, -1, true);
    if (!newObject.checkDataChanged(sort)) {
      newObject.change(field, 1, true);
      setSort(newObject);
    } else {
      setSort(newObject);
    }
  };
  const handleUpdateData = (data) => {
    // request
    //   .post('user/update/002', { Address: Math.random() * 10 })

    //   .catch(() => console.log('fail'));
    return setEditData(data);
  };
  return (
    <div className={classes}>
      {page && (
        <Content
          level={user.level}
          orderBy={orderBy}
          slug={slug}
          onSortBy={handleSortBy}
          onHandleEdit={handleOnEdit}
          onDeleteData={handleDeleteData}
          onChangeData={handleUpdateData}
          onResetData={handleResetData}
          baseDatas={datas}
          page={page}
        ></Content>
      )}
      {!page && <DefaultPage user={user} />}
    </div>
  );
}

export default Admin;
