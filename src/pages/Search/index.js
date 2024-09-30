import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Search.module.scss';
import request from '~/utils/request';
import Product from '~/assets/db/tables/product.js';
import LightNovel from '~/assets/db/tables/lightnovel.js';
import User from '~/assets/db/tables/user.js';
import Customer from '~/assets/db/tables/customer.js';

// import request from '~/utils/request';
import images from '~/assets/images';
// import User from '~/assets/db/tables/user.js';
// import Carousel from '~/components/Carousel';
import Tag from '~/components/Tag';
import Fields from '~/components/Fields/index.js';
const cx = classNames.bind(styles);
function Search({ categories, type, books, searchByName, searchByAuthor }) {
  // const { category } = useParams();
  const [bookDetail, setBookDetail] = useState([]);
  const [lightNovelDetail, setLightNovelDetail] = useState([]);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [newCategory, setCategories] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const [searchLightNovel, setSearchLightNovel] = useState([]);
  const [findByTag, setFindByTag] = useState([]);
  useEffect(() => {
    if (categories.length > 0) {
      setCategories(categories);
    }
  }, [categories]);

  useEffect(() => {
    console.log('searchBook : ', searchBook);
  }, [searchBook]);
  useEffect(() => {
    if (!bookDetail.length > 0) {
      request
        .get('product/')
        .then((res) => {
          const response = res.data.map((dt) => new Product(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setBookDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });
  useEffect(() => {
    if (!lightNovelDetail.length > 0) {
      request
        .get('lightnovel/')
        .then((res) => {
          const response = res.data.map((dt) => new LightNovel(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setLightNovelDetail(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });
  useEffect(() => {
    if (newCategory.length > 0 && findByTag.length < 0) {
      // console.log('category', newCategory);
      newCategory.map(
        (cate) =>
          books.map(
            (book) =>
              book.findByTag(cate) && setFindByTag((pre) => [...pre, book])
          )

        // return console.log(b);
      );
    }
    return;
  }, [newCategory, books, findByTag]);
  console.log('books', books);
  // useEffect(() => {
  //   if (
  //     searchByAuthor &&
  //     bookDetail.length > 0 &&
  //     lightNovelDetail.length > 0
  //   ) {
  //     if (user.length > 0 || customer.length > 0) {
  //       bookDetail.map((data) => {
  //         if (data.findByAuthorID(user).findName(searchByAuthor)) {
  //           return setSearchBook((pre) => [...pre, data]);
  //         } else return false;
  //       });
  //     }
  //   }
  // });

  useEffect(() => {
    if (searchByAuthor) {
      if (bookDetail.length > 0) {
        if (user.length > 0) {
          bookDetail.map((data) => {
            if (data.findByAuthorID(user).findName(searchByAuthor)) {
              return setSearchBook((pre) => [...pre, data]);
            } else return false;
          });
        }
        if (customer.length > 0) {
          bookDetail.map((data) => {
            if (data.findByAuthorID(customer).findName(searchByAuthor)) {
              return setSearchBook((pre) => [...pre, data]);
            } else return false;
          });
        }
      }

      if (lightNovelDetail.length > 0) {
        if (lightNovelDetail.length > 0) {
          if (user.length > 0) {
            lightNovelDetail.map((data) => {
              if (data.findByAuthorID(user).findName(searchByAuthor)) {
                return setSearchLightNovel((pre) => [...pre, data]);
              } else return false;
            });
          }
          if (customer.length > 0) {
            lightNovelDetail.map((data) => {
              if (data.findByAuthorID(customer).findName(searchByAuthor)) {
                return setSearchLightNovel((pre) => [...pre, data]);
              } else return false;
            });
          }
        }
      }
    }
  });

  useEffect(() => {
    if (searchByAuthor) {
      request
        .get('user/')
        .then((res) => {
          const response = res.data.map((dt) => new User(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setUser(newRequest);
        })
        .catch(() => console.log('false'));
      request
        .get('customer/')
        .then((res) => {
          const response = res.data.map((dt) => new Customer(dt));
          // console.log(response);
          const newRequest = response.map((resp) => {
            if (!resp.image) {
              resp.setImage(images.noImage);
            } else resp.setImage('http://localhost:3001/public/' + resp.image);
            return resp;
          });
          // console.log('newRequest : ', newRequest);
          setCustomer(newRequest);
        })
        .catch(() => console.log('false'));
    }
  });
  useEffect(() => {
    if (searchByName) {
      if (bookDetail.length > 0) {
        bookDetail.map((data) => {
          console.log('data : ', searchByName);
          if (data.findByName(searchByName)) {
            return setSearchBook((pre) => [...pre, data]);
          } else return false;
        });
      }
      if (lightNovelDetail.length > 0) {
        lightNovelDetail.map((data) => {
          if (data.findByName(searchByName)) {
            return setSearchLightNovel((pre) => [...pre, data]);
          } else return false;
        });
      }
    }
  }, [searchByName, bookDetail, lightNovelDetail]);
  // useEffect(() => {
  //   if (newCategory) {
  //     if (bookDetail.length > 0) {
  //       bookDetail.map((data) => {
  //         console.log('data : ', newCategory);
  //         if (data.findByTag(newCategory)) {
  //           return setSearchBook((pre) => [...pre, data]);
  //         } else return false;
  //       });
  //     }
  //     if (lightNovelDetail.length > 0) {
  //       lightNovelDetail.map((data) => {
  //         if (data.findByTag(newCategory)) {
  //           return setSearchLightNovel((pre) => [...pre, data]);
  //         } else return false;
  //       });
  //     }
  //   }
  // }, [newCategory, bookDetail, lightNovelDetail]);
  // console.log(categories);
  // console.log(type);
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
  //   overlord4,
  //   overlord5,
  // ];
  return (
    <div
      className={cx('wrapper')}
      // onMouseDown={handleMouseDown}
    >
      <div className={cx('header')}>
        <div className={cx('title')}>
          Tìm kiếm {searchByName && 'theo tên'}
          {searchByAuthor && 'theo tác giả'}
          {!searchByName && !searchByAuthor && (
            <>
              <b>
                {type === '2' ? 'Light novel' : type === '3' ? 'Book' : ''}{' '}
              </b>
              theo :
              <div>
                {Array.isArray(newCategory) &&
                  newCategory.map((val, index) => (
                    <div className={cx('tag')} key={index}>
                      <Tag value={val}></Tag>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      findByTag
      {findByTag && findByTag.length > 0 && (
        <>
          <div className={cx('title')}>Bộ truyện :</div>
          <Fields datas={findByTag}></Fields>
        </>
      )}
      {searchBook && searchBook.length > 0 && (
        <>
          <div className={cx('title')}>Bộ tiểu thuyết :</div>
          <Fields datas={searchBook}></Fields>
        </>
      )}
      {searchLightNovel && searchLightNovel.length > 0 && (
        <>
          <div className={cx('title')}>Chương truyện chữ :</div>
          <Fields datas={searchLightNovel} isChapter></Fields>
        </>
      )}
    </div>
  );
}

export default Search;
