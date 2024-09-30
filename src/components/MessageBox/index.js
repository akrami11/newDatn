import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';

import EditableInput from '~/components/EditableInput';

import Button from '~/components/Button';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import {  } from '~/assets/checkString';
import { faLocationArrow, faXmark } from '@fortawesome/free-solid-svg-icons';

const getValueFromSession = (values) => {
  if (values) {
    return JSON.parse(values);
  } else return false;
};

const cx = classNames.bind(styles);
function MessageBox({
  message,
  closeMessageBox,
  hasShowMsg,
  collapseMessageBox,
}) {
  // console.log('message : ', message);
  // const [showGoToTop, setShowGoToTop] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState();
  const [messageValue, setMessageValue] = useState('');

  const [hasClick, setClick] = useState(false);
  const [hasReset, setReset] = useState(false);
  const [hasSendMessage, setSendMessage] = useState(false);
  const [hasEnter, setEnter] = useState(false);
  const [hasShift, setShift] = useState(false);
  const [messages, setMessages] = useState(
    getValueFromSession(sessionStorage.getItem(message.title)) || message.msg
  );
  const [scrollBottom, setScrollBottom] = useState(false);

  const messageRef = useRef(null);
  const sendRef = useRef();
  // console.log(messages);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 300) {
  //       setShowGoToTop(true);
  //     } else setShowGoToTop(false);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    setShowMessageBox(hasShowMsg);
  }, [hasShowMsg]);

  useEffect(() => {
    if (scrollBottom || showMessageBox) {
      scrollToElement();
      setScrollBottom(false);
    }
  }, [scrollBottom, showMessageBox]);

  // useEffect(() => {
  //   if (collapseBox) {
  //     collapseMessageBox(message.title, showMessageBox);
  //     setShowMessageBox(!showMessageBox);
  //     setCollapseMessageBox(false);
  //   }
  // }, [collapseBox, message, showMessageBox, collapseMessageBox]);

  useEffect(() => {
    setReset(false);
  }, [messageValue]);
  useEffect(() => {
    if (hasClick) {
      setReset(true);
      setClick(false);
    }
  }, [hasClick]);
  //on enter :
  useEffect(() => {
    if (!hasShift && hasEnter) {
      console.log(1);
      setSendMessage(true);
    }
    return () => {
      setEnter(false);
      setShift(false);
    };
  }, [hasShift, hasEnter]);
  useEffect(() => {
    console.log(hasShift);
  }, [hasShift]);

  useEffect(() => {
    if (hasSendMessage) {
      if (messageValue) {
        let newMessages = messages;
        // let newMessage = {
        //   id: count,
        //   type: 'send',
        //   mess: messageValue,
        // };
        let newMessage = messageValue;

        newMessages.push({ sent_msg: newMessage });
        setMessages(newMessages);
        sessionStorage.setItem(message.title, JSON.stringify(messages));
        setScrollBottom(true);
        setMessageValue();
        setClick(true);
        sendRef.current.focus();
      }
    }
    return () => {
      setSendMessage(false);
    };
  }, [message, hasSendMessage, messageValue, messages]);

  const scrollToElement = () => {
    const lastChildElement = messageRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };

  // const goToTop = () => {
  //   window.scrollTo({ top: 0 });
  // };
  const handleCollapseMessageBox = (title) => {
    return setShowMessageBox(collapseMessageBox(title).status);
  };
  // const handleOpenMessageBox = () => {
  //   setShowMessageBox(true);
  // };
  const handleSendMessage = () => {
    setSendMessage(true);
  };

  const handleKeyDown = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      setEnter(true);
      // setShift(true);
    }
    // else if (e.key === 'Enter') {
    //   setEnter(true);
    // }
    // setSendMessage(true);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Shift') {
      setShift(false);
    }
    // console.log('native :', e.nativeEvent.key);
  };
  const checkMessage = (msg) => {
    if (msg) {
      const newArr = msg.split(' ');
      let fl = false;
      newArr.forEach((val) => {
        if (val.length > 17) {
          return (fl = true);
        }
      });
      if (fl) {
        return { wordWrap: 'break-word' };
      }
    }
    return {};
  };
  // console.log('bbbbb : ', checkMessage('aaaaaaaaaaaaaaaaaaaaaaaa'));
  const sendMessage = (mess, index) => {
    return (
      <div className={cx('sendMessage')} key={index}>
        <div className={cx('collapseSendMessage')}>
          <span className={cx('messageLabel')} style={checkMessage(mess)}>
            {mess}
          </span>
        </div>
      </div>
    );
  };
  const receiveMessage = (mess, index) => {
    return (
      <div className={cx('receiveMessage')} key={index}>
        <div className={cx('collapseReceiveMessage')}>
          <span className={cx('messageLabel')} style={checkMessage(mess)}>
            {mess}
          </span>
        </div>
      </div>
    );
  };
  const messageBox = (message) => {
    return (
      <div className={cx('messageBox')}>
        <div className={cx('titleBox')}>
          <div
            className={cx('mainTitle')}
            onClick={() => handleCollapseMessageBox(message.title)}
          >
            <Button
              // icon={faFacebookMessenger}
              src={message.img}
              round='round'
              type='item'
              size='mini'
            />
            <div className={cx('name')}>{message.user_name}</div>
          </div>
          <Button
            type='actButton'
            round='round'
            icon={faXmark}
            changeColor
            size='mini'
            onClick={() => closeMessageBox(message.title)}
          />
        </div>
        <div className={cx('mainBox')} ref={messageRef}>
          {messages.map(
            (val, index) =>
              (val.sent_msg && sendMessage(val.sent_msg, index)) ||
              (val.received_msg && receiveMessage(val.received_msg, index))
          )}
        </div>
        <div className={cx('sendBox')}>
          <EditableInput
            innerRef={sendRef}
            value={messageValue}
            onChange={(value) => setMessageValue(value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            replace='Nhập tin nhắn'
            resetValue={hasReset}
            icon={faLocationArrow}
            buttonType='messagesBoxButton'
            onButtonClick={handleSendMessage}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={cx('wrapper')}>
      {!showMessageBox && (
        <Button
          // icon={faFacebookMessenger}
          src={message.img}
          round='round'
          type='item'
          size='mini'
          onClick={() => handleCollapseMessageBox(message.title)}
        />
      )}

      {showMessageBox && messageBox(message)}
    </div>
  );
}

export default MessageBox;
