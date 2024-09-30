import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './Carousel.module.scss';
import IconButton from '~/components/Button/IconButton';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import Image from '~/components/Image';
import Item from '~/components/Item';
// const preList = [
//   {
//     content: 1,
//   },
//   {
//     content: 2,
//   },
//   {
//     content: 3,
//   },
//   {
//     content: 4,
//   },
//   {
//     content: 5,
//   },
//   {
//     content: 6,
//   },
//   {
//     content: 7,
//   },
//   {
//     content: 8,
//   },
//   {
//     content: 9,
//   },
//   {
//     content: 10,
//   },
// ];
const cx = classNames.bind(styles);
const overlord = {
  ID: '001',
  name: 'Overlord Volume 1 - Chúa tể bất tử',
  image:
    'https://img.lazcdn.com/g/p/a54bb1bc60c88b716272410a91a4677e.jpg_720x720q80.jpg',
  description:
    'Overlord lấy bối cảnh vào năm 2138 trong tương lai, khi khoa học công nghệ phát triển vượt bậc và ngành game thực tế ảo đang nở rộ hơn bao giờ hết. Câu chuyện bắt đầu trong những giây phút cuối tại Yggdrasil, một game online đình đám sắp phải đóng cửa. Nhân vật chính Momonga quyết định ở lại đến tận những phút cuối cùng với trò chơi yêu thích của mình và chờ server down. Bất ngờ, server không shutdown, Momonga bị mắc kẹt trong nhân vật của chính mình và dịch chuyển tới một thế giới khác. Vị chúa tể hùng mạnh của đại lăng tẩm Nazarick giờ đây lại tiếp tục đi khám phá thế giới mới và đối mặt với những thử thách mới. Không gia đình, bạn bè, địa vị xã hội, người đàn ông bình thường ấy sẽ cố gắng hết sức để thống trị thế giới mới này.',
  price: '70000',
  quantity: 10,
};
function Carousel({ data, type, number }) {
  const [carouDatas, setDatas] = useState([overlord]);
  const [carousel, setCarousel] = useState(0);
  const [carouselX, setCarouselX] = useState(0);
  const [newStyle, setNewStyle] = useState({});
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseOut, setMouseOut] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [numCount, setNumCount] = useState(10);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState('');
  const carouselRef = useRef();
  const bannerRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      setDatas(data);
      setNumCount(data.length);
    }
    return;
  }, [data]);

  // scroll carousel :
  useEffect(() => {
    if (numCount && number && carouselRef.current.clientWidth) {
      setItemWidth(bannerRef.current.clientWidth / number);
      setScrollWidth((bannerRef.current.clientWidth * numCount) / number);
    }
  }, [numCount, number]);
  useEffect(() => {
    if (!mouseDown) {
      const timeOut = setTimeout(() => {
        if (carousel > number - numCount) {
          setCarousel(Math.round(carousel - 1));
        } else setCarousel(0);
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [carousel, number, mouseDown, numCount]);
  useEffect(() => {
    if (mouseOut) {
      const timeOut = setTimeout(() => {
        setMouseDown(0);
        setCarousel(Math.round(carousel));
        setMouseOut(false);
      }, 100);
      return () => clearTimeout(timeOut);
    }
  });
  useEffect(() => {
    const newTransform = 'translate3d(' + carousel * itemWidth + 'px, 0, 0)';
    setNewStyle({ transform: newTransform, width: scrollWidth + 'px' });
  }, [carousel, itemWidth, scrollWidth]);

  const handleMouseMove = (e) => {
    if (mouseEnter) {
      if (mouseDown !== 0) {
        const newScroll = carouselX - (mouseDown - e.clientX) / itemWidth;
        if (newScroll > number - numCount && newScroll < 0)
          return setCarousel(newScroll);
      }
    }
  };
  const handleMouseDown = (e) => {
    setMouseEnter(true);
    setCarouselX(carousel);
    setMouseDown(e.clientX);
  };
  const handleMouseUp = () => {
    setMouseDown(0);
    setMouseOut(true);
    setMouseEnter(false);
  };
  const handleMouseEnter = () => {
    setMouseEnter(false);
    setMouseDown(0);
  };
  const handleMouseOut = () => {
    setMouseOut(true);
  };
  const handleScrollRight = () => {
    const newScroll = carousel + 1;
    if (newScroll <= 0) setCarousel(newScroll);
    else setCarousel(number - numCount);
  };
  const handleScrollLeft = () => {
    const newScroll = carousel - 1;
    if (newScroll >= number - numCount) setCarousel(newScroll);
    else setCarousel(0);
  };

  return (
    <div className={cx('wrapper')}>
      <div
        ref={bannerRef}
        className={cx('carousel')}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      >
        <div
          className={cx('button')}
          style={{
            height: (itemWidth * 4) / 3 + 30 + 'px',
          }}
        >
          <div className={cx('scrollButton')}>
            <IconButton
              icon={faChevronRight}
              size={'mini'}
              type='item'
              hover
              onClick={handleScrollRight}
            ></IconButton>
          </div>
          <div className={cx('scrollButton')}>
            <IconButton
              icon={faChevronLeft}
              size={'mini'}
              type='item'
              hover
              onClick={handleScrollLeft}
            ></IconButton>
          </div>
        </div>
        {carouDatas.length && (
          <div className={cx('list')} style={newStyle} ref={carouselRef}>
            {/* {preList.map((item, index) => (
            <div className={cx('item')} key={index}>
              {item.content}
            </div>
          ))} */}
            {carouDatas.map((data, index) => (
              <div
                className={cx('item')}
                key={index}
                style={{
                  width: itemWidth + 'px',
                  height: (itemWidth * 4) / 3 + 30 + 'px',
                }}
              >
                <Item item={data} type={type} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
