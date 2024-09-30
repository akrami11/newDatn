import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Input from '~/components/Input';
import Image from '~/components/Image';
import TextButton from '~/components/Button/TextButton';
import Product from '~/assets/db/tables/product.js';
import LightNovel from '~/assets/db/tables/lightnovel.js';
import Item from '~/components/LightNovelItem';
import styles from './AddLightNovel.module.scss';
import images from '~/assets/images';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function AddLightNovel({
  books,
  newBook,
  onChange,
  onCloseBox,
  lightNovelDetail,
  logginDetails,
  bookDetail,
  onReset,
}) {
  const [item, setItem] = useState({});

  const [newData] = useState(newBook ? new Product() : new LightNovel());
  const [hasCounted, setCounted] = useState(false);
  const [onSelect, setSelect] = useState('0');
  const [hasShow, setShow] = useState(false);
  const [series, setSeries] = useState('');

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [price, setPrice] = useState('0');
  //   const [quantity, setQuantity] = useState('');
  const [PRID, setPRID] = useState('001');
  const [AuthorID] = useState(logginDetails.ID);
  const [LID] = useState(bookDetail ? bookDetail.LID : books.reverse()[0].LID);
  const [volume, setVolume] = useState('');
  const [chapter, setChapter] = useState(
    lightNovelDetail ? lightNovelDetail.length + 1 : 1
  );
  const [file, setFile] = useState('');
  const [hasSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (!hasCounted)
      request
        .get((newBook ? 'product' : 'lightnovel') + '/getLastRecord')
        .then((res) => {
          const counter = Number(res.data.ID) + 1;
          if (counter < 10) {
            newData.setID('00' + counter);
          } else if (counter < 100) {
            newData.setID('0' + counter);
          } else {
            newData.setID(counter.toString());
          }
          setCounted(true);
        })
        .catch(() => {
          return 1;
        });
  }, [hasCounted, newData, newBook]);

  useEffect(() => {
    if (hasSubmit)
      if (newBook) {
        const newPrd = new Product({
          series: series,
          name: name,
          image: image,
          description: description,
          price: price,
          // quantity: quantity,
          PRID: PRID,
          AuthorID: AuthorID,
          LID: LID,
          views: 0,
        });
        newPrd.setTag(tag);
        newPrd.setID(newData.ID);
        // console.log(newPrd);
        newPrd.create();
        onReset && onReset();
        return onCloseBox && onCloseBox();
      } else {
        const newPrd = new LightNovel({
          volume,
          chapter,
          file,
          name: name,
          image: image,
          AuthorID: AuthorID,
          LID: LID,
          views: 0,
        });
        newPrd.setID(newData.ID);
        console.log(newPrd);
        newPrd.create();
        onReset && onReset();
        return onCloseBox && onCloseBox();
      }
    return () => setSubmit(false);
  }, [
    onReset,
    newBook,
    onChange,
    onCloseBox,
    volume,
    chapter,
    file,
    newData,
    hasSubmit,
    series,
    name,
    image,
    description,
    tag,
    price,
    // quantity,
    PRID,
    AuthorID,
    LID,
  ]);

  useEffect(() => {
    if (onSelect === '1') {
      return setShow(true);
    }
    return setShow(false);
  }, [onSelect]);
  useEffect(() => {
    const checkSeries = (val) => {
      if (Array.isArray(books) && books.length) {
        const newIndex = books.findIndex((book) => book.series === val);
        if (newIndex >= 0) {
          return books[newIndex];
        }
      }
      return {};
    };
    if (series) {
      setItem(checkSeries(series));
    }
  }, [series, books]);

  const handleChange = (e) => {
    return setImage(e);
  };

  const handleClickSubmit = () => {
    return setSubmit(true);
  };
  const handleClickCancel = () => {
    return onCloseBox && onCloseBox();
  };
  const FileInput = () => {
    return (
      <>
        <input
          type='file'
          style={{ display: 'none', width: '100%' }}
          id={'file_inp'}
          onChange={(e) => setFile(e.target.files[0])}
          disabled={false}
        />
        <label
          htmlFor={'file_inp'}
          style={{ width: '100%', wordBreak: 'break-word', cursor: 'pointer' }}
        >
          {file ? file.name : 'Chọn file : .txt'}
        </label>
      </>
      // <Input type={'file'} id={index + '_file'} label={children.name}></Input>
    );
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>Đăng truyện</div>
      {newBook && (
        <div className={cx('content')}>
          <div className={cx('title')}>Series: </div>
          <select
            className={cx('input')}
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value={0}>Truyện mới</option>
            <option value={1}>Truyện cũ</option>
          </select>
        </div>
      )}
      {newBook && hasShow && (
        <div className={cx('content')}>
          <div className={cx('title')}> </div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={series}
              border
              placeholder={'Series'}
              onChange={(e) => setSeries(e)}
            />
          </div>
        </div>
      )}
      {newBook && hasShow && item.ID && (
        <div className={cx('content', 'item')}>
          <Item item={item} add></Item>
        </div>
      )}
      <div className={cx('content')}>
        <div className={cx('title')}>Tên :</div>
        <div className={cx('input')}>
          <Input
            type='text'
            value={name}
            border
            placeholder={'Tên'}
            onChange={(e) => setName(e)}
          />
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('title')}>Ảnh :</div>
        <div className={cx('input')}>
          <Image
            name={'image'}
            disabled={false}
            index={-1}
            src={images.noImage}
            size={'normal'}
            // onClick={() => console.log(1)}
            onChange={(val) => handleChange(val, 'image')}
          />
        </div>
      </div>
      {newBook || (
        <div className={cx('content')}>
          <div className={cx('title')}>Tập :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={volume}
              border
              placeholder={'Tập'}
              onChange={(e) => setVolume(e)}
            />
          </div>
        </div>
      )}
      {newBook || (
        <div className={cx('content')}>
          <div className={cx('title')}>Chương :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={chapter}
              border
              placeholder={'Chương'}
              onChange={(e) => setChapter(e)}
            />
          </div>
        </div>
      )}
      {newBook || (
        <div className={cx('content')}>
          <div className={cx('title')}>File :</div>
          <div className={cx('input')}>
            <FileInput />{' '}
          </div>
        </div>
      )}
      {newBook && (
        <div className={cx('content')}>
          <div className={cx('title')}>Mô tả :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={description}
              border
              placeholder={'description'}
              onChange={(e) => setDescription(e)}
            />
          </div>
        </div>
      )}
      {newBook && (
        <div className={cx('content')}>
          <div className={cx('title')}>Tag :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={tag}
              border
              placeholder={'tag'}
              onChange={(e) => setTag(e)}
            />
          </div>
        </div>
      )}
      {newBook && (
        <div className={cx('content')}>
          <div className={cx('title')}>Giá :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={price}
              border
              placeholder={'price'}
              onChange={(e) => setPrice(e)}
            />
          </div>
        </div>
      )}
      {/* {newBook && (
        <div className={cx('content')}>
          <div className={cx('title')}>Mã nhà sản xuất :</div>
          <div className={cx('input')}>
            <Input
              type='text'
              value={PRID}
              border
              placeholder={'PRID'}
              onChange={(e) => setPRID(e)}
            />
          </div>
        </div>
      )} */}

      <div className={cx('content')}>
        <TextButton
          type='success'
          size='large'
          margin
          hover
          radius
          onClick={handleClickSubmit}
        >
          Thêm truyện
        </TextButton>
        <TextButton
          type='danger'
          size='large'
          margin
          hover
          radius
          onClick={handleClickCancel}
        >
          Hủy
        </TextButton>
      </div>
    </div>
  );
}

export default AddLightNovel;
