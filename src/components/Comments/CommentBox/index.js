import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import EmojiPicker from 'emoji-picker-react'; 

import styles from '../Comments.module.scss';

import images from '~/assets/images';
import TextButton from '~/components/Button/TextButton';
import EditableInput from '~/components/EditableInput';
import IconButton from '~/components/Button/IconButton';
import { getIcon, checkComment } from '~/assets/content';

import Comment from '~/assets/db/tables/comment.js';

const setMember = () => {
  if (localStorage.getItem('member')) {
    return JSON.parse(localStorage.getItem('member'));
  }
  if (sessionStorage.getItem('member')) {
    return JSON.parse(sessionStorage.getItem('member'));
  }
  return {
    name: 'Nguyễn Quang Nam',
    image: images.noImage,
  };
};

const cx = classNames.bind(styles);
function CommentBox({ commentsDetail, parent, chapter, LID, hasCommented }) {
  //user :
  const [user] = useState(setMember());
  //comment :
  //   const [hasShowComment, setShowComment] = useState(false);
  const [comment, setChangeComment] = useState('');
  const [commentName, setCommentName] = useState(user.name);
  // const [commentEmail, setCommentEmail] = useState('');
  const [hightCommentBox, setHightCommentBox] = useState(90);
  const [showCommentBox, setShowCommentBox] = useState(parent ? true : false);
  const [hasComment, setHasComment] = useState(false);
  const cmtRef = useRef();
  //   useEffect(() => {
  //     if (hasComment) {
  //       setShowComment(true);
  //     }
  //     return () => setHasComment(false);
  //   }, [hasComment]);
  useEffect(() => {
    if (cmtRef.current.clientHeight > 90)
      setHightCommentBox(cmtRef.current.clientHeight + 10 + 'px');
  }, [comment]);
  //   const handleClickReadComment = () => {
  //     setHightCommentBox(70);
  //     return setShowComment(!hasShowComment);
  //   };
  const handleClickCommentButton = () => {
    if (comment.length > 0) {
      const thisComment = parent
        ? new Comment({
            UID: user.ID,
            LID: LID,
            username: commentName,
            content: comment,
            image: user.image,
            replyName: parent.username,
            chapter,
            createdAt: Date(),
          })
        : new Comment({
            UID: user.ID,
            LID: LID,
            username: commentName,
            content: comment,
            image: user.image,
            chapter,
            createdAt: Date(),
          });
      // console.log(thisComment);

      if (!parent) {
        console.log('newComment : ', thisComment);
        // console.log(thisComment);
        thisComment.create();
      } else {
        parent.addChild(thisComment);
        // console.log('parent : ', parent, thisComment);
        parent.update();
      }
      // console.log(commentsDetail);
      // commentsDetail.update(true);
      setChangeComment('');
      setHasComment(true);
      hasCommented && hasCommented();
      //   handleClickReadComment();
    }
  };
  const handleChangeComment = (e) => {
    return setChangeComment(checkComment(e));
  };
  const handleAddEmoji = (e) => {
    return setChangeComment((pre) => pre + e);
  };

  const handleClickCommentBox = () => {
    return setShowCommentBox(true);
  };
  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('showButton')} onClick={handleClickReadComment}>
        {!hasShowComment ? 'Đọc bình luận' : 'Ẩn bình luận'}
      </div> */}
      <div className={cx('content')}>
        <div
          className={cx('comment')}
          style={{
            minHeight: hightCommentBox,
          }}
          onClick={handleClickCommentBox}
        >
          <EditableInput
            baseValue={comment}
            innerRef={cmtRef}
            resetValue={hasComment}
            onChange={handleChangeComment}
            replace={
              'Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu lành mạnh,... để tránh bị khóa tài khoản'
            }
            fullBox
            innerPadding
          />
        </div>
        {showCommentBox && (
          <div className={cx('detail')}>
            <div className={cx('reactBox')}>
              <div className={cx('emojiBox')}>
                <Tippy
                  trigger='click'
                  interactive='true'
                  placement='right-start'
                  arrow='true'
                  render={(attrs) => (
                    <div className={cx('tippyBox')} {...attrs}>
                      <EmojiPicker
                        onEmojiClick={(e) => handleAddEmoji(e.emoji)}
                      ></EmojiPicker>
                    </div>
                  )}
                >
                  <div className={cx('emojiBox')}>
                    <IconButton
                      icon={getIcon('faFaceSmile')}
                      size='free'
                      hover
                    ></IconButton>
                  </div>
                </Tippy>
              </div>
              <div className={cx('name')}>
                <EditableInput
                  onChange={(e) => setCommentName(e)}
                  replace={user.name}
                  fullBox
                  innerPadding
                />
              </div>
            </div>

            <div className={cx('commentButton')}>
              <TextButton
                size='large'
                type='info'
                hover
                onClick={handleClickCommentButton}
              >
                Bình luận
              </TextButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
