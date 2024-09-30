import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

import request from '~/utils/request';
import images from '~/assets/images';
// import User from '~/assets/db/tables/user.js';
import Carousel from '~/components/Carousel';
import Product from '~/assets/db/tables/product.js';
// import request from '~/utils/request';
import Fields from '~/components/Fields/index.js';
import LightNovelList from 'src/components/ListLightNovel';

const setUnique = (arr) => {
  if (Array.isArray(arr)) {
    var unique = arr.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    return unique;
  }
  return [];
};

const cx = classNames.bind(styles);
function Home({ books, lightNovel, follow, history, logginDetails }) {
  // console.log('Home : ', books, lightNovel);
  const [topView, setTopView] = useState([]);
  const [newLN, setNewLN] = useState([]);
  const [hasGetNewLN, getNewLN] = useState(false);
  const [storageHistory, setStorageHistory] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('read')) {
      const newHistory = JSON.parse(localStorage.getItem('read'));
      // console.log('newHistory : ', newHistory);
      setStorageHistory(newHistory);
    }
  }, []);

  useEffect(() => {
    if (!hasGetNewLN) {
      if (Array.isArray(lightNovel) && lightNovel.length) {
        const newArray = lightNovel.map((ln) => ln.LID);
        // console.log(setUnique(newArray));
        if (books.length) {
          setUnique(newArray).map((arr) => {
            const newIndex = books.findIndex((book) => arr === book.LID);
            // console.log(newIndex);
            setNewLN((pre) => [...pre, books[newIndex]]);
            return 1;
          });
        }
        return getNewLN(true);
      }
    }
  }, [lightNovel, books, hasGetNewLN]);
  // // const [hasDown, setDown] = useState(true);
  // // const handleMouseDown = () => {
  // //   setMouseDown(true);
  // // };
  // const overlord = {
  //   ID: '001',
  //   name: 'Overlord Volume 1 - The undead king',
  //   image: images.vol1,
  //   description:
  //     'Overlord lấy bối cảnh vào năm 2138 trong tương lai, khi khoa học công nghệ phát triển vượt bậc và ngành game thực tế ảo đang nở rộ hơn bao giờ hết. Câu chuyện bắt đầu trong những giây phút cuối tại Yggdrasil, một game online đình đám sắp phải đóng cửa. Nhân vật chính Momonga quyết định ở lại đến tận những phút cuối cùng với trò chơi yêu thích của mình và chờ server down. Bất ngờ, server không shutdown, Momonga bị mắc kẹt trong nhân vật của chính mình và dịch chuyển tới một thế giới khác. Vị chúa tể hùng mạnh của đại lăng tẩm Nazarick giờ đây lại tiếp tục đi khám phá thế giới mới và đối mặt với những thử thách mới. Không gia đình, bạn bè, địa vị xã hội, người đàn ông bình thường ấy sẽ cố gắng hết sức để thống trị thế giới mới này.',
  //   price: '70000',
  //   quantity: 10,
  // };
  // const overlord2 = {
  //   ID: '002',
  //   name: 'Overlord Volume 2 - The dark knight',
  //   image: images.vol2,
  //   description:
  //     'Phần 2 của bộ truyện Overlod nói về nhân vật Momoga sau khi cải trang thành chiến binh giáp đen và trở thành mạo hiểm giả',
  //   price: '120000',
  //   quantity: 10,
  // };
  // const overlord3 = {
  //   ID: '002',
  //   name: 'Overlord Volume 3 - The Bloody Valkyrie',
  //   image: images.vol3,
  //   description: 'Phần 3 của bộ truyện Overlod.',
  //   price: '160000',
  //   quantity: 10,
  // };
  // const overlord4 = {
  //   ID: '003',
  //   name: 'Overlord Volume 4 - The Lizard Man Heroes',
  //   image: images.vol4,
  //   description:
  //     'Phần 4 của bộ truyện Overlod. Nhân vật chính Ainz cho thuộc hạ của mình tấn công vùng đầm lầy nơi mà các làng lizard man sinh sống. Liệu những lizard man đó sẽ làm gì để có thể chống lạ họ?',
  //   price: '150000',
  //   quantity: 10,
  // };
  // const overlord5 = {
  //   ID: '004',
  //   name: 'Overlord Volume 5 - The Men of the Kingdom 1',
  //   image: images.vol5,
  //   description:
  //     'Phần 5 của bộ truyện Overlod. Nội dung chính nói về Sebas nhận nhiệm vụ tại mội thành phố. Và trong phần này cũng tiết lộ mội phần nhỏ sức mạnh của Sebas.',
  //   price: '170000',
  //   quantity: 10,
  // };
  // const newdddd = [
  //   overlord,
  //   overlord2,
  //   overlord3,
  //   overlord4,
  //   overlord5,
  //   overlord,
  //   overlord2,
  //   overlord3,
  //   // overlord4,
  //   // overlord5,
  // ];
  useEffect(() => {
    if (!topView.length) {
      request
        .get('product/getTopView')
        .then((res) => {
          const response = res.data.map((dt) => new Product(dt));
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setTopView(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });
  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      {topView.length > 0 && (
        <div className={cx('banner')}>
          <div className={cx('carousel')}>
            <div className={cx('carouselTitle')}>Truyện đề cử</div>
            <Carousel data={topView.splice(0, 10)} number={5} />
          </div>
        </div>
      )}
      {/* {books.length > 0 && (
        <div className={cx('banner')}>
          <div className={cx('carousel')}>
            <div className={cx('carouselTitle')}>Truyện mới</div>
            <Carousel data={books} type='Hot' number={5} />
          </div>
        </div>
      )} */}
      <div className={cx('banner')}>
        <div className={cx('field')}>
          <div className={cx('carouselTitle')}>Truyện mới</div>
          <Fields
            datas={newLN}
            books={books}
            history={storageHistory}
            logginDetails={logginDetails}
            lightnovel={lightNovel}
          ></Fields>
        </div>
        <div className={cx('others')}>
          {follow && follow.length > 0 && (
            <LightNovelList
              title='Truyện theo dõi :'
              list={follow}
              follow
              lightNovel={lightNovel}
            ></LightNovelList>
          )}
          {history && history.length > 0 && (
            <LightNovelList
              title='Lịch sử đọc truyện :'
              list={history}
            ></LightNovelList>
          )}
        </div>
      </div>
      {/* 
      {newLN.length > 0 && (
        <div className={cx('banner')}>
          <div className={cx('carousel')}>
            <div className={cx('carouselTitle')}>Truyện mới</div>
            <Carousel data={newLN} type='Hot' number={5} />
          </div>
        </div>
      )} */}
      {/* <div className={cx('banner')}>
        <div className={cx('carousel')}>
          <div className={cx('carouselTitle')}>Top lượt xem</div>
          <Carousel data={newdddd} number={6} />
        </div>
      </div> */}
      {/* <div className={cx('banner')}>
        <div className={cx('carousel')}>
          <div className={cx('carouselTitle')}>Sách bán chạy</div>
          <Carousel />
        </div>
      </div> */}
    </div>
  );
}

export default Home;
