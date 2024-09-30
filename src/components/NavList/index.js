import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './NavList.module.scss';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import MessageBox from '~/components/MessageBox';
import Button from '~/components/Button';
import IconButton from '~/components/Button/IconButton';
import TextButton from '~/components/Button/TextButton';
import ImageButton from '~/components/Button/ImageButton';
import getIcon from '~/assets/content/getIcon';
// import Image from '~/components/Image';
const cx = classNames.bind(styles);

function NavList({
  hasShow,
  level,
  list,
  child,
  id,
  onClick,
  type,
  handleOpenMessageBox,
  switchColor,
  pg,
  hasEdit,
  newItemComponent,
}) {
  const count = child ? child : 0;
  const [showChild, setShowChild] = useState('');
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    if (list.length > 0) setNewList(list);
  }, [list]);
  const [hasAdded, setAdded] = useState(false);
  const [hasChecked, setChecked] = useState(false);
  const [item, setItem] = useState();

  // console.log(child, newList);
  const [childrenList, setChildrenList] = useState([]);
  const [preChildren, setPreChildren] = useState([]);

  useEffect(() => {
    setChecked(hasEdit);
    setAdded(false);
  }, [hasEdit]);

  // useEffect(() => {
  //   if (!hasAdded) {
  //     if (newItemComponent) {
  //       if (newList.length > 0) {
  //         if (hasChecked) {
  //           setAdded(true);
  //           setList((child) => [...child, newItemComponent]);
  //         } else
  //           newList.map((item, index) => {
  //             if (item.ID === newItemComponent.ID) {
  //               newList.splice(index, 1);
  //               setAdded(true);
  //               // return setList((child) => child.splice(index, 1));
  //               // return newList.splice(index, 1);
  //             }
  //             return 1;
  //           });
  //       }
  //     }
  //   }
  // }, [hasChecked, hasAdded, newItemComponent, newList]);
  // useEffect(() => {
  //   if (Array.isArray(list)) {
  //     if (!id) {
  //       setList(list);
  //     } else {
  //       list.map((item) => {
  //         if (id === item.ID) {
  //           setList((child) => [...child, item.children]);
  //         }
  //         return setChildrenList((child) => [...child, item]);
  //       });
  //     }
  //   }
  // }, [id, list]);

  useEffect(() => {
    if (!pg && !child)
      if (newList.length > 0) {
        newList.map((item) => {
          if (item.children) {
            item.children.map((parent) =>
              newList.map((child, index) => {
                if (parent === child.ID) {
                  setChildrenList((data) => [
                    ...data,
                    { ID: item.ID, children: child },
                  ]);
                  newList.splice(index, 1);
                }
                return 1;
              })
            );
          }
          return 1;
        });
      }
  }, [newList, child, pg]);

  useEffect(() => {
    if (!pg && !child)
      if (hasChecked) {
        if (newList.length > 0) {
          if (childrenList.length > 0) {
            childrenList.map((child) => {
              newList.map((item, index) => {
                if (child.children.ID === item.ID) {
                  return newList.splice(index, 1);
                } else return 1;
              });
              return 1;
            });
          }
        }
      }
    return () => setChecked(false);
  }, [newList, childrenList, hasChecked, pg, child]);

  const handleOnClick = (val) => {
    return handleOpenMessageBox(val);
  };

  const handleShowItem = (id) => {
    console.log(id);
    if (showChild === id) {
      setShowChild();
    } else setShowChild(id);
  };
  const checkShowItem = (id) => {
    return showChild === id;
  };
  const checkShowSidebar = (item) => {
    if (hasShow) return level <= Number(item.level);
    else return true;
  };

  return newList.map(
    (item, index) =>
      checkShowSidebar(item) && (
        <div
          className={cx(
            'wrapper',
            count > 0 && 'childItem',
            switchColor && (index % 2 === 0 ? 'even' : 'odd')
          )}
          onClick={onClick && onClick}
          key={index}
        >
          <div className={cx('item')}>
            <div
              className={cx('item')}
              onClick={
                type === 'msg' ? () => handleOnClick(item.title) : item.onClick
              }
            >
              {item.img && (
                <ImageButton
                  src={item.img}
                  round={true}
                  type='actButton'
                  size={'mini'}
                ></ImageButton>
              )}
              {(item.icon || item.actIcon) && (
                <IconButton
                  to={item.to && item.to}
                  icon={getIcon(item.icon) || getIcon(item.actIcon)}
                  size={'mini'}
                  // type='item'
                  type='normal'
                ></IconButton>
              )}
              {hasShow && (
                <TextButton to={item.to && item.to}>{item.title}</TextButton>
              )}
            </div>

            {item.actIcon && (
              <Button
                to={item.to}
                icon={item.actIcon}
                onClick={item.onClick}
                hover='hover'
                type='item'
              ></Button>
            )}
            {item.children && hasShow && (
              <Button
                type='actButton'
                hover='hover'
                icon={checkShowItem(item.ID) ? faChevronUp : faChevronDown}
                onClick={() => handleShowItem(item.ID)}
              />
            )}
          </div>
          {item.children && hasShow && checkShowItem(item.ID) && (
            <NavList
              hasShow={hasShow}
              list={item.children}
              id={item.ID}
              index={index}
              key={index}
              switchColor={true}
              child={count + 1}
              level={level}
              newItemComponent={newItemComponent}
              hasEdit={hasEdit}
            ></NavList>
          )}
          {hasEdit && (
            <NavList
              hasShow={hasShow}
              list={newItemComponent}
              id={item.ID}
              index={index}
              key={index}
              switchColor={true}
              child={count + 1}
              level={level}
              newItemComponent={newItemComponent}
              hasEdit={hasEdit}
            ></NavList>
          )}
        </div>
      )
  );
}

export default NavList;
