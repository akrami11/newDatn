import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Comments.module.scss';
import CommentBox from '../CommentBox';

// import images from '~/assets/images';
import IconButton from '~/components/Button/IconButton';
import TextButton from '~/components/Button/TextButton';
import Image from '~/components/Image';
// import Input from '~/components/Input';
// import EditableInput from '~/components/EditableInput';
import Popup from '~/components/PopupComponent';
import Log from '~/components/LogMessage';
import { getIcon, getTimeDetail } from '~/assets/content';

// const ccc = {
//   id: '001',
//   image: images.noImage,
//   username: 'name 1',
//   content: ' comment 1',
//   parent: '001',
// };

const getID = () => {
  if (localStorage.getItem('member')) {
    return JSON.parse(localStorage.getItem('member'));
  }
  if (sessionStorage.getItem('member')) {
    return JSON.parse(sessionStorage.getItem('member'));
  }
  return {};
};

const cx = classNames.bind(styles);

function CommentItem({
  comment,
  // commentsDetail,
  child,
  parent,
  chapter,
  LID,
  parentComment,
}) {
  // const [counter] = useState(count + 1);

  const [userId] = useState(getID().ID);
  const [showThisComment, setShowThisComment] = useState(true);
  const [hasOpenCommentBox, setOpenCommentBox] = useState(false);
  const [hasOpenDeleteBox, setOpenDeleteBox] = useState(false);
  const [hasOpenMessageLog, setOpenMessageLog] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [commentCounter, setCounter] = useState(1);
  // console.log(comment);

  useEffect(() => {
    if (!showThisComment) {
      setShowThisComment(true);
    }
  }, [showThisComment]);

  const checkOwner = (data) => {
    if (Array.isArray(data)) {
      const index = data.findIndex((item) => {
        if (item.uid === userId) {
          return true;
        }
        return false;
      });
      if (index >= 0) {
        return true;
      } else return false;
    } else if (data === userId) {
      return true;
    }
    return false;
  };
  const getCounter = (list) => {
    if (Array.isArray(list)) {
      return list.length;
    } else return 0;
  };

  const handleClickReplyButton = () => {
    return setOpenCommentBox(true);
  };
  const handleClickLikeButton = () => {
    comment.like(userId);
    comment.update();
    return setShowThisComment(false);
  };
  const handleClickDislikeButton = () => {
    comment.dislike(userId);
    comment.update();
    return setShowThisComment(false);
  };
  const handleCloseBox = () => {
    return setOpenDeleteBox(false);
  };
  const handleClickDeleteComment = () => {
    return setOpenDeleteBox(true);
  };
  const handleConfirmDeleteComment = () => {
    comment.delete();
    setResponseStatus(comment.update());
    handleCloseBox();
    setOpenMessageLog(true);
    return setShowThisComment(false);
  };
  const handleReplyComment = () => {
    return setOpenCommentBox(false);
  };
  const handleClickReadMore = () => {
    setCounter(commentCounter + 1);
  };
  return (
    <div className={cx('item')}>
      {showThisComment && !comment.deletedAt && (
        <>
          <div className={cx('avatar')}>
            <Image src={comment.image} size='mini'></Image>
          </div>
          <FontAwesomeIcon
            icon={getIcon('faChevronLeft')}
            className={cx('chevronLeft')}
          ></FontAwesomeIcon>
          <div className={cx('commentDetail')}>
            <div className={cx('info')}>
              <div className={cx('commentHeader')}>
                <div className={cx('userName')}>{comment.username}</div>
                {comment.chapter && (
                  <div className={cx('chapter')}>Chapter {comment.chapter}</div>
                )}
              </div>
              {comment.replyName && (
                <div className={cx('replyName')}>
                  <FontAwesomeIcon icon={getIcon('faShare')}></FontAwesomeIcon>
                  {comment.replyName}
                </div>
              )}
              <div className={cx('commentContent')}>
                {comment.content ? comment.content : ''}
              </div>
            </div>
            <div className={cx('commentFooter')}>
              <div className={cx('reply')} onClick={handleClickReplyButton}>
                <IconButton
                  icon={getIcon('faComment')}
                  size='tiny'
                ></IconButton>
                Trả lời
              </div>
              <div className={cx('vote', checkOwner(comment.liked) && 'voted')}>
                <IconButton
                  icon={getIcon('faThumbsUp')}
                  size='tiny'
                  onClick={handleClickLikeButton}
                ></IconButton>
                {getCounter(comment.liked)}
              </div>
              <div
                className={cx('vote', checkOwner(comment.disliked) && 'voted')}
              >
                <IconButton
                  icon={getIcon('faThumbsDown')}
                  size='tiny'
                  onClick={handleClickDislikeButton}
                ></IconButton>
                {/* {'dislike count'} */}
                {getCounter(comment.disliked)}
              </div>
              {checkOwner(comment.UID) && (
                <TextButton onClick={handleClickDeleteComment}>
                  Xóa bình luận
                </TextButton>
              )}
              {comment.createdAt && (
                <div className={cx('time')}>
                  <FontAwesomeIcon icon={getIcon('faClock')} />{' '}
                  {getTimeDetail(comment.createdAt)}
                </div>
              )}
            </div>
            {!child &&
              Array.isArray(comment.child) &&
              comment.child.map((child, index) => {
                if (index < commentCounter * 3) {
                  return (
                    <CommentItem
                      comment={child}
                      // commentsDetail={commentsDetail}
                      child={true}
                      parent={comment}
                      LID={LID}
                      chapter={chapter}
                      key={index}
                      parentComment={handleReplyComment}
                    ></CommentItem>
                  );
                } else return <div key={index}></div>;
              })}
            {!child &&
              Array.isArray(comment.child) &&
              commentCounter * 3 < comment.child.length && (
                <div
                  className={cx('showMoreReply')}
                  onClick={handleClickReadMore}
                >
                  Hiển thị thêm 3 câu trả lời
                </div>
              )}
            {hasOpenCommentBox && (
              <div className={cx('replyBox')}>
                <CommentBox
                  // commentsDetail={commentsDetail}
                  parent={!child ? comment : parent}
                  LID={LID}
                  chapter={chapter}
                  hasCommented={!child ? handleReplyComment : parentComment}
                ></CommentBox>
              </div>
            )}
          </div>
        </>
      )}

      {/* popup component : */}
      {hasOpenDeleteBox && (
        <Popup onClick={handleCloseBox}>
          <div className={cx('deleteBox')}>
            <div className={cx('boxTitle')}>Xóa bình luận</div>
            <p className={cx('boxMessage')}>
              Bạn có chắc muốn xóa bình luận này ?
            </p>
            <div className={cx('boxFooter')}>
              <TextButton
                size='large'
                round
                hover
                onClick={handleConfirmDeleteComment}
              >
                Xóa
              </TextButton>
              <TextButton size='large' round hover onClick={handleCloseBox}>
                Cancel
              </TextButton>
            </div>
          </div>
        </Popup>
      )}
      {hasOpenMessageLog && (
        <Log
          act={'Xóa'}
          onAutoClose={() => setOpenMessageLog(false)}
          status={responseStatus}
        />
      )}
    </div>
  );
}

export default CommentItem;
