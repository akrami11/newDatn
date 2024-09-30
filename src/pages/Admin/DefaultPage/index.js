import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BarChart } from '@mui/x-charts/BarChart';

import request from '~/utils/request';
//
// import User from '~/assets/db/tables/user.js';
import Product from '~/assets/db/tables/product.js';

import images from '~/assets/images';
import styles from './DefaultPage.module.scss';
// import Input from '~/components/Input';
import Image from '~/components/Image';
// import { Table, Row, Col } from '~/components/TableComponent';
// import { checkWeekDays } from '~/assets/content/';
// console.log(setPrice('13,000,000'));
const cx = classNames.bind(styles);

// const workDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
// const business = [
//   { data: [350000, 420000] },
//   { data: [510000, 600000] },
//   { data: [515000, 725000] },
//   { data: [600000, 750000] },
// ];
// const axis = [
//   [{ data: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'], scaleType: 'band' }],

// ];
const business = [
  { data: [350000, 420000, 515000, 600000] },
  { data: [510000, 600000, 725000, 750000] },
];
const axis = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
function DefaultPage({ user, ...props }) {
  const [newProduct, setNewProduct] = useState([]);
  // const [newUser, setNewUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (newProduct.length === 0) {
      request
        .get('product/new/')
        .then((res) => {
          const newRequest = res.data.map((data) => {
            const newObject = new Product(data);
            if (data.deletedAt) {
              newObject.setDeletedTime(data.deletedAt);
            }
            return newObject;
          });
          const newDatas = newRequest.map((data) => {
            if (!data.image) {
              data.setImage(images.noImage);
            } else data.setImage('http://localhost:3001/public/' + data.image);

            return data;
          });

          setNewProduct(newDatas);
        })
        .catch(() => console.log('get product failed'));
    }
  }, [newProduct]);
  const handleClickNewProduct = () => {
    navigate('product/new');
  };
  const handleClickUser = () => {
    navigate('user');
  };
  const handleClickCustomer = () => {
    navigate('customer');
  };
  const handleClickProduct = () => {
    navigate('product');
  };
  // const MeetSchedule = () => {
  //   return (
  //     <Table>
  //       <Row header>
  //         <Col disable header>
  //           Lịch họp
  //         </Col>
  //         {workDays.map((day, i) => (
  //           <Col disable key={i}>
  //             {day}
  //           </Col>
  //         ))}
  //       </Row>
  //       <Row>
  //         <Col disable header>
  //           Ca sáng
  //         </Col>
  //         {meets.map((meet, i) => (
  //           <Col disable key={i}>
  //             {meet.day}
  //           </Col>
  //         ))}
  //       </Row>
  //       <Row>
  //         <Col disable header>
  //           Ca sáng
  //         </Col>
  //         {meets.map((meet, i) => (
  //           <Col disable key={i}>
  //             {meet.night}
  //           </Col>
  //         ))}
  //       </Row>
  //     </Table>
  //   );
  // };
  const Sale = () => {
    return <div>sale</div>;
  };
  const NewProduct = () => {
    return (
      <div className={cx('box')} onClick={handleClickNewProduct}>
        {newProduct && newProduct.length > 0 && (
          <div className={cx('notify')}>{newProduct.length}</div>
        )}
        <div className={'title'}>Truyện mới đăng</div>
        <div className={cx('image')}>
          <Image src={images.newProd} size='home'></Image>
        </div>
      </div>
    );
  };
  const NewBox = (title, src, onClick) => {
    return (
      <div className={cx('box')} onClick={onClick}>
        <div className={'title'}>{title}</div>
        <div className={cx('image')}>
          <Image src={src} size='home'></Image>
        </div>
      </div>
    );
  };
  // const User = () => {
  //   return <div>user </div>;
  // };
  // const Customer = () => {
  //   return <div>Customer </div>;
  // };
  const BusinessRate = () => {
    return (
      <div>
        <ChartsOverviewDemo></ChartsOverviewDemo>
      </div>
    );
  };
  const ChartsOverviewDemo = () => {
    return (
      <BarChart
        series={business}
        height={250}
        width={350}
        xAxis={[{ data: axis, scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    );
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h1 className={cx('mainTitle')}>Chúc bạn một ngày làm việc tốt lành</h1>
      </div>
      <div className={cx('main')}>
        <div className={cx('banner')}>
          {/* <div className={cx('action')}>
          <User />
        </div> */}
          <div className={cx('action')}>
            <NewProduct />
          </div>
          <div className={cx('action')}>
            {NewBox('Nhân viên', images.toUser, handleClickUser)}
          </div>
          <div className={cx('action')}>
            {NewBox('Khách hàng', images.toCustomer, handleClickCustomer)}
          </div>
        </div>
        {/* <div className={cx('action')}>
          <Customer />
        </div> */}
        <div className={cx('banner')}>
          <div className={cx('action')}>
            {NewBox('Tiểu thuyết', images.newProd, handleClickProduct)}
          </div>
          <div className={cx('action')}>
            {NewBox('Nhà cung cấp', images.toProductor, handleClickProduct)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;
