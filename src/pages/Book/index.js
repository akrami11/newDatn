import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import styles from './Book.module.scss';

import Image from '~/components/Image';
import TextButton from '~/components/Button/TextButton';
import request from '~/utils/request';
import Product from '~/assets/db/tables/product.js';
import images from '~/assets/images';
import Popup from '~/components/PopupComponent';
import Cart from '~/components/Cart';
import Tag from '~/components/Tag';
import { getPrice } from '~/assets/content';
import { Like } from '~/components/_FbPlugin';

// const overlord = {
//   ID: '001',
//   LID: '001',
//   name: 'Overlord Volume 1 - The undead king',
//   image: images.vol1,
//   tag: [1, 2, 3, 4, 5],
//   description:
//     'Overlord lấy bối cảnh vào năm 2138 trong tương lai, khi khoa học công nghệ phát triển vượt bậc và ngành game thực tế ảo đang nở rộ hơn bao giờ hết. Câu chuyện bắt đầu trong những giây phút cuối tại Yggdrasil, một game online đình đám sắp phải đóng cửa. Nhân vật chính Momonga quyết định ở lại đến tận những phút cuối cùng với trò chơi yêu thích của mình và chờ server down. Bất ngờ, server không shutdown, Momonga bị mắc kẹt trong nhân vật của chính mình và dịch chuyển tới một thế giới khác. Vị chúa tể hùng mạnh của đại lăng tẩm Nazarick giờ đây lại tiếp tục đi khám phá thế giới mới và đối mặt với những thử thách mới. Không gia đình, bạn bè, địa vị xã hội, người đàn ông bình thường ấy sẽ cố gắng hết sức để thống trị thế giới mới này.',
//   price: '70000',
//   quantity: 10,
// };
// const overlord2 = {
//   ID: '002',
//   name: 'Overlord Volume 2 - The dark knight',
//   image: images.vol2,
//   tag: [1, 2, 3, 4, 5],
//   description:
//     'Phần 2 của bộ truyện Overlod nói về nhân vật Momoga sau khi cải trang thành chiến binh giáp đen và trở thành mạo hiểm giả',
//   price: '120000',
//   quantity: 10,
// };
// const overlord3 = {
//   ID: '002',
//   name: 'Overlord Volume 3 - The Bloody Valkyrie',
//   image: images.vol3,
//   tag: [1, 2, 3, 4, 5],
//   description: 'Phần 3 của bộ truyện Overlod.',
//   price: '160000',
//   quantity: 10,
// };
// const overlord4 = {
//   ID: '003',
//   name: 'Overlord Volume 4 - The Lizard Man Heroes',
//   image: images.vol4,
//   tag: [1, 2, 3, 4, 5],
//   description:
//     'Phần 4 của bộ truyện Overlod. Nhân vật chính Ainz cho thuộc hạ của mình tấn công vùng đầm lầy nơi mà các làng lizard man sinh sống. Liệu những lizard man đó sẽ làm gì để có thể chống lạ họ?',
//   price: '150000',
//   quantity: 10,
// };
// const overlord5 = {
//   ID: '004',
//   name: 'Overlord Volume 5 - The Men of the Kingdom 1',
//   image: images.vol5,
//   tag: [1, 2, 3, 4, 5],
//   description:
//     'Phần 5 của bộ truyện Overlod. Nội dung chính nói về Sebas nhận nhiệm vụ tại mội thành phố. Và trong phần này cũng tiết lộ mội phần nhỏ sức mạnh của Sebas.',
//   price: '170000',
//   quantity: 10,
// };

const cx = classNames.bind(styles);
function Book({ refreshNotification }) {
  const { ID } = useParams();
  const [bookDetail, setBookDetail] = useState({});
  const [dataHref, setNewDataHref] = useState(
    process.env.REACT_APP_LIVE_URL + 'lightNovel/?id=' + ID
  );
  const [addCart, setAddCart] = useState(false);
  const [buy, setBuy] = useState({});
  const navigate = useNavigate();
  console.log('ID : ', ID);
  useEffect(() => {
    if (!bookDetail.ID) {
      request
        .get('product/getOne/' + ID)
        .then((res) => {
          const newRequest = new Product(res.data);
          if (!newRequest.image) {
            newRequest.setImage(images.noImage);
          } else
            newRequest.setImage(
              'http://localhost:3001/public/' + newRequest.image
            );
          setBookDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });

  useEffect(() => {
    const setNew = (cart) => {
      return {
        ID: cart.ID,
        quantity:
          cart.ID === bookDetail.ID ? Number(cart.quantity) + 1 : cart.quantity,
      };
    };
    if (addCart) {
      if (sessionStorage.getItem('cart')) {
        let newCart = JSON.parse(sessionStorage.getItem('cart'));
        const newRes = newCart.map((cart) => setNew(cart));
        // newCart.push({ ID: bookDetail.ID, quantity: 1 });
        setAddCart(false);
        refreshNotification();
        return sessionStorage.setItem('cart', JSON.stringify(newRes));
      } else {
        let newCart = [];
        newCart.push({ ID: bookDetail.ID, quantity: 1 });
        setAddCart(false);
        refreshNotification();
        return sessionStorage.setItem('cart', JSON.stringify(newCart));
      }
    }
    return () => setAddCart(false);
  }, [addCart, bookDetail, refreshNotification]);
  const handleBuyBook = () => {
    return setBuy(bookDetail);
  };
  const handleAddCart = () => {
    setAddCart(!addCart);
  };
  const handleViewLightNovel = () => {
    return navigate('/read/' + bookDetail.LID);
  };

  const handleCloseBox = () => {
    setBuy({});
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Image src={bookDetail.image} size={'normal'} />
      </div>
      <div className={cx('props')}>
        <div className={cx('title')}>{bookDetail.name}</div>
        <div className={cx('tag')}>
          Thể loại :
          {Array.isArray(bookDetail.tag) &&
            bookDetail.tag.map((val, index) => (
              <Tag value={val} key={index}></Tag>
            ))}
        </div>
        <div className={cx('status')}>
          Tình trạng : {bookDetail.quantity > 0 ? 'Có sẵn' : 'Hết hàng'}
        </div>
        <div className={cx('description')}>
          Mô tả : {bookDetail.description}
        </div>
        <div className={cx('price')}>Giá : {getPrice(bookDetail.price)}đ</div>
        <Like dataHref={dataHref} dataLocal='vi_VN'></Like>
        <div className={cx('action')}>
          <div className={cx('button')}>
            <TextButton
              type={'success'}
              size='large'
              onClick={handleBuyBook}
              radius
              hover
            >
              Mua ngay
            </TextButton>
          </div>
          <div className={cx('button')}>
            <TextButton
              type={'primary'}
              size='large'
              onClick={handleAddCart}
              radius
              hover
            >
              Thêm giỏ hàng
            </TextButton>
          </div>
          {bookDetail.LID && (
            <div className={cx('button')}>
              <TextButton
                type={'info'}
                size='large'
                onClick={handleViewLightNovel}
                radius
                hover
              >
                Đọc online
              </TextButton>
            </div>
          )}
        </div>
      </div>
      {buy.ID && (
        <Popup onClick={() => handleCloseBox()}>
          <Cart data={buy} onCloseBox={handleCloseBox}></Cart>
        </Popup>
      )}
    </div>
  );
}

export default Book;
