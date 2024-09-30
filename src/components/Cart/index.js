import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';

import request from '~/utils/request';
import images from '~/assets/images';
// import User from '~/assets/db/tables/user.js';
import Input from '~/components/Input';
import TextButton from '~/components/Button/TextButton';
import { Table, Row, Col } from '~/components/TableComponent';
import { getPrice, getClass } from '~/assets/content';
const overlord = {
  ID: '001',
  name: 'Overlord Volume 1 - The undead king',
  image: images.vol1,
  tag: [1, 2, 3, 4, 5],
  description:
    'Overlord lấy bối cảnh vào năm 2138 trong tương lai, khi khoa học công nghệ phát triển vượt bậc và ngành game thực tế ảo đang nở rộ hơn bao giờ hết. Câu chuyện bắt đầu trong những giây phút cuối tại Yggdrasil, một game online đình đám sắp phải đóng cửa. Nhân vật chính Momonga quyết định ở lại đến tận những phút cuối cùng với trò chơi yêu thích của mình và chờ server down. Bất ngờ, server không shutdown, Momonga bị mắc kẹt trong nhân vật của chính mình và dịch chuyển tới một thế giới khác. Vị chúa tể hùng mạnh của đại lăng tẩm Nazarick giờ đây lại tiếp tục đi khám phá thế giới mới và đối mặt với những thử thách mới. Không gia đình, bạn bè, địa vị xã hội, người đàn ông bình thường ấy sẽ cố gắng hết sức để thống trị thế giới mới này.',
  price: '70000',
  quantity: 10,
};
const overlord2 = {
  ID: '002',
  name: 'Overlord Volume 2 - The dark knight',
  image: images.vol2,
  tag: [1, 2, 3, 4, 5],
  description:
    'Phần 2 của bộ truyện Overlod nói về nhân vật Momoga sau khi cải trang thành chiến binh giáp đen và trở thành mạo hiểm giả',
  price: '120000',
  quantity: 10,
};
const overlord3 = {
  ID: '002',
  name: 'Overlord Volume 3 - The Bloody Valkyrie',
  image: images.vol3,
  tag: [1, 2, 3, 4, 5],
  description: 'Phần 3 của bộ truyện Overlod.',
  price: '160000',
  quantity: 10,
};
const overlord4 = {
  ID: '003',
  name: 'Overlord Volume 4 - The Lizard Man Heroes',
  image: images.vol4,
  tag: [1, 2, 3, 4, 5],
  description:
    'Phần 4 của bộ truyện Overlod. Nhân vật chính Ainz cho thuộc hạ của mình tấn công vùng đầm lầy nơi mà các làng lizard man sinh sống. Liệu những lizard man đó sẽ làm gì để có thể chống lạ họ?',
  price: '150000',
  quantity: 10,
};
const overlord5 = {
  ID: '004',
  name: 'Overlord Volume 5 - The Men of the Kingdom 1',
  image: images.vol5,
  tag: [1, 2, 3, 4, 5],
  description:
    'Phần 5 của bộ truyện Overlod. Nội dung chính nói về Sebas nhận nhiệm vụ tại mội thành phố. Và trong phần này cũng tiết lộ mội phần nhỏ sức mạnh của Sebas.',
  price: '170000',
  quantity: 10,
};
const newdddd = [
  overlord,
  overlord2,
  overlord3,
  overlord4,
  overlord5,
  overlord,
  overlord2,
  overlord3,
  overlord4,
  overlord5,
];
const fields = [
  'Stt',
  'Tên sản phẩm',
  'Hình ảnh',
  'Số lượng',
  'Đơn giá',
  'Thành tiền',
];
// const overlord = {
//   ID: '001',
//   LID: '001',
//   name: 'Overlord Volume 1 - Chúa tể bất tử',
//   tag: [1, 2, 3, 4, 5],

//   image:
//     'https://img.lazcdn.com/g/p/a54bb1bc60c88b716272410a91a4677e.jpg_720x720q80.jpg',
//   description:
//     'Overlord lấy bối cảnh vào năm 2138 trong tương lai, khi khoa học công nghệ phát triển vượt bậc và ngành game thực tế ảo đang nở rộ hơn bao giờ hết. Câu chuyện bắt đầu trong những giây phút cuối tại Yggdrasil, một game online đình đám sắp phải đóng cửa. Nhân vật chính Momonga quyết định ở lại đến tận những phút cuối cùng với trò chơi yêu thích của mình và chờ server down. Bất ngờ, server không shutdown, Momonga bị mắc kẹt trong nhân vật của chính mình và dịch chuyển tới một thế giới khác. Vị chúa tể hùng mạnh của đại lăng tẩm Nazarick giờ đây lại tiếp tục đi khám phá thế giới mới và đối mặt với những thử thách mới. Không gia đình, bạn bè, địa vị xã hội, người đàn ông bình thường ấy sẽ cố gắng hết sức để thống trị thế giới mới này.',
//   price: '70000',
//   quantity: 10,
// };
const cx = classNames.bind(styles);
function Cart({ data, onCloseBox }) {
  const [cartData, setCartData] = useState(overlord);
  const [login] = useState(
    localStorage.getItem('login')
      ? JSON.parse(localStorage.getItem('login'))
      : {}
  );
  const [datas, setData] = useState(newdddd);
  const [customer, setCustomer] = useState({});
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [user] = useState(login.level <= 3 ? 'user' : 'customer');
  useEffect(() => {
    if (login.ID) {
      request.get(user + '/getOne' + login.ID).then((res) => {
        const newRequest = getClass(user, res.data);
        setCustomer(newRequest);
      });
    }
  });
  useEffect(() => {
    if (data) {
      setCartData(data);
    } else
      setCarts(
        sessionStorage.getItem('cart')
          ? JSON.parse(sessionStorage.getItem('cart'))
          : []
      );
  }, [data]);
  useEffect(() => {
    if (carts.length > 0) {
      carts.forEach((item) => {
        datas.map((data) => {
          if (item.ID === data.ID) {
            return setCartData((preRIem) => [...preRIem, data]);
          }
          return 1;
        });
      });
    } else setCartData({});
  }, [carts, datas]);
  useEffect(() => {
    if (Array.isArray(cartData)) {
      let newSum = 0;
      cartData.map((item, index) => {
        return (newSum += Number(carts[index].quantity) * Number(item.price));
      });
      setTotal(newSum);
    } else {
      if (cartData.ID) setTotal(data.price);
      else setTotal(0);
    }
  }, [data, cartData, carts]);

  const handleCloseBox = () => {
    return onCloseBox();
  };
  const handleBuy = () => {};
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('title')}>Giỏ hàng</div>
        <div className={cx('content')}>
          <Table>
            <Row header>
              {fields.map((field, index) => (
                <Col header disable key={index}>
                  {field}
                </Col>
              ))}
            </Row>
            {Array.isArray(cartData)
              ? cartData.map((item, index) => (
                  <Row>
                    <Col header disable key={index}>
                      {index + 1}
                    </Col>
                    <Col disable key={index}>
                      {item.name}
                    </Col>
                    <Col disable key={index} fieldName={'image'}>
                      {item.image}
                    </Col>
                    <Col disable key={index}>
                      {carts[index].quantity}
                    </Col>
                    <Col disable key={index}>
                      {getPrice(item.price)}
                    </Col>
                    <Col disable key={index}>
                      {getPrice(
                        Number(carts[index].quantity) * Number(item.price)
                      )}
                    </Col>
                  </Row>
                ))
              : cartData &&
                cartData.ID && (
                  <Row>
                    <Col header disable>
                      {1}
                    </Col>
                    <Col disable>{data.name}</Col>
                    <Col disable fieldName={'image'} size={'normal'}>
                      {data.image}
                    </Col>
                    <Col disable>{1}</Col>
                    <Col disable>{getPrice(data.price)}</Col>
                    <Col disable>{getPrice(Number(data.price))}</Col>
                  </Row>
                )}
            <Row>
              <Col disable header colSpan={5}>
                Tổng
              </Col>
              <Col disable header>
                {total}
              </Col>
            </Row>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Input></Input>
        </div>
      </div>
      <div className={cx('footer')}>
        <div className={cx('footerButton')}>
          <TextButton
            type={'primary'}
            size='mini'
            onClick={handleBuy}
            radius
            hover
          >
            Mua
          </TextButton>
        </div>
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
  );
}

export default Cart;
