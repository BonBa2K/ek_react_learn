import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./Ani.css";

function Ani() {
  const [toggle, setToggle] = useState(true);
  const [list, addToList] = useState([]);

  const handleToggle = () => {
    setToggle(HAHAH => !HAHAH);
  }
  const handleList = () => {
    addToList(HAHAH => [...HAHAH, 'item']);
  }

  return (
    <>
      <h1>For Animation</h1>
      <CSSTransition
        in={toggle}
        timeout={2000}
        classNames="MyCl"
        appear
        unmountOnExit
        onEntered={(el) => { el.style.color = 'yellow' }}
      >

        <div>here is CSSTransition {toggle ? 'show' : 'hide'}</div>

      </CSSTransition>
      <div className={toggle ? 'o_show' : 'o_hide'}>Let's {toggle ? 'show' : 'hide'}</div>
      <button onClick={handleToggle}>toggle</button>

      <br />
      <br />

      <div>here is TransitionGroup</div>
      <button onClick={handleList}>add item</button>
      {/* 如果不使用 TransitionGroup，你可能需要自己管理这些动画类的添加和移除，这会增加代码复杂性和维护难度。 */}
      <TransitionGroup>
        {
          list.map(
            (item, index) => (
              <CSSTransition
                timeout={2000}
                classNames="MyCl"
                onEntered={(el) => { el.style.color = 'yellow' }}
                key={index}>
                <div>{item} {index}</div>
              </CSSTransition>
            )
          )
        }
      </TransitionGroup>
      <div className="bottom-line"></div>
    </>
  );
}

export default Ani;
