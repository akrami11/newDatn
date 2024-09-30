import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import Comment from '~/assets/db/tables/comment';

import styles from './Comments.module.scss';

// import IconButton from '~/components/Button/IconButton';
// import TextButton from '~/components/Button/TextButton';
// import Image from '~/components/Image';
// import Input from '~/components/Input';
// import EditableInput from '~/components/EditableInput';

import CommentBox from './CommentBox';
import CommentItem from './CommentItem';

import images from '~/assets/images';
import request from '~/utils/request';

const cx = classNames.bind(styles);
function Comments({ book, LID, chapter, newComment }) {
  // //user :
  // const [user] = useState(setMember());
  // book detials :
  // const [bookDetail, setBookDetail] = useState({});
  const [newComments, setNewComments] = useState([]);
  const [hasGetComment, setGetComment] = useState(true);
  //comment :
  const [commentCounter, setCounter] = useState(1);
  const [hasShowComment, setShowComment] = useState(
    localStorage.getItem('showCmt')
      ? localStorage.getItem('showCmt') === 'true'
        ? true
        : false
      : false
  );

  // const cmtRef = useRef();

  // get comment :
  useEffect(() => {
    if (hasGetComment) {
      if (chapter) {
        if (LID) {
          request
            .get('comment/commentChapter/' + LID + '/' + chapter)
            .then((res) => {
              const response = res.data.map((dt) => new Comment(dt));
              // console.log(response);
              const newRequest = response.map((resp) => {
                if (!resp.image) {
                  resp.setImage(images.noImage);
                }
                return resp;
              });
              setGetComment(false);
              setNewComments(newRequest);
            })
            .catch(() => console.log('false'));
        }
      } else if (LID) {
        request
          .get('comment/' + LID)
          .then((res) => {
            const response = res.data.map((dt) => new Comment(dt));
            // console.log('response : ', response);
            const newRequest = response.map((resp) => {
              if (!resp.image) {
                resp.setImage(images.noImage);
              }

              return resp;
            });
            // console.log('newRequest2 : ', res.data);
            setGetComment(false);
            setNewComments(newRequest);
          })
          .catch(() => console.log('false'));
      }
    }
  }, [hasGetComment, chapter, LID, newComments]);

  //set ln detail :
  // useEffect(() => {
  //   if (book) {
  //     if (book.ID && book.LID) {
  //       // console.log(book);
  //       setBookDetail(book);
  //     }
  //   }
  // }, [book]);

  // useEffect(() => {
  //   if (Array.isArray(bookDetail.comment)) {
  //     // console.log(bookDetail);
  //     setComments(bookDetail.comment);
  //   }
  // }, [bookDetail]);

  // useEffect(() => {
  // console.log('book : ', bookDetail);
  // }, [bookDetail]);
  useEffect(() => {
    localStorage.setItem('showCmt', hasShowComment);
    console.log(hasShowComment);
  }, [hasShowComment]);
  // useEffect(() => {
  //   if (cmtRef.current.clientHeight > 90)
  //     setHightCommentBox(cmtRef.current.clientHeight);
  // }, [comment]);
  const handleCommented = () => {
    return setGetComment(true);
  };
  const handleClickReadComment = () => {
    return setShowComment(!hasShowComment);
  };
  const handleClickReadMore = () => {
    return setCounter(commentCounter + 1);
  };
  return (
    <div className={cx('wrapper')}>
      <CommentBox
        newComment={new Comment()}
        LID={LID}
        chapter={chapter}
        hasCommented={handleCommented}
      ></CommentBox>
      <div className={cx('showCommentBox')}>
        <input
          type='checkbox'
          id={'inpShowCommentBox'}
          defaultChecked={hasShowComment}
          onClick={handleClickReadComment}
        />
        <label htmlFor='inpShowCommentBox'>Hiện bình luận</label>
      </div>
      {hasShowComment &&
        newComments.map((data, index) => {
          if (index < commentCounter * 5) {
            return (
              <div className={cx('wrapper')} key={index}>
                <CommentItem
                  comment={data}
                  newComment={new Comment()}
                  LID={LID}
                  chapter={chapter}
                ></CommentItem>
              </div>
            );
          } else return <div key={index}></div>;
        })}
      {hasShowComment && commentCounter * 5 < newComments.length && (
        <div className={cx('showMore')} onClick={handleClickReadMore}>
          Hiển thị thêm 5 bình luận
        </div>
      )}
    </div>
  );
}

export default Comments;
