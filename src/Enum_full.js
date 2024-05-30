import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './Enum.css';
import Enum_item from './Enum_item';

// ajax存取
axios.get('https://dog.ceo/api/breeds/image/random')
  .then((response) => { console.log(response.data["message"]); })
  .catch(() => { alert('error'); })

const Arr_Prod = [
  { title: 'Cabbage', purple: false, id: 1 },
  { title: 'Garlic', purple: false, id: 2 },
  { title: 'Apple', purple: true, id: 3 },
];

// 物件本身
// 當物件的state或props受到改變會執行一次render
const Enum = () => {

  // 解構賦值：const [狀態變數名, 更新函數名] = useState(初始值);
  // useState來創建可編輯的State variable與編輯函式，React專屬
  // Vue2 用 data Vue3 用 ref & reactive
  const [products, setProducts] = useState(Arr_Prod);
  const [newProductTitle, setNewProductTitle] = useState('');
  const [isPurple, setPurple] = useState(false);

  // useRef 可用於 存取不渲染變數/取得DOM資料
  const nextId = useRef(products.length + 1);
  const rootRef = useRef(null);

  // handler，將賦值封裝成函式的是為了
  // 1.響應用戶操作 2.更新父組件資料 3.自動測試方便
  // 如果不调用 setNewProductTitle 更新状态，输入框的值不会改变，因为 React 不知道状态已经更新。
  const handleTitleChange = (JOJO) => {
    setNewProductTitle(JOJO.target.value);
    // const divCount = rootRef.current.querySelectorAll('li').length;
    // console.log(`Number of li elements: ${divCount}`);
  };
  const handlePurpleChange = (event) => {
    setPurple(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = newProductTitle.trim() === '' ? 'default' : newProductTitle;
    const newProduct = {
      title: title,
      purple: isPurple,
      id: nextId.current
    };
    nextId.current += 1;

    setProducts([...products, newProduct]);
    setNewProductTitle('');
    setPurple(false);
  };

  const handleDelete = useCallback((id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  }, []);

  // render 每次有所變動時，下一個frame要再渲染一次
  // class 元件要用render() function元件則不用
  // 在函数组件中，渲染逻辑就是函数的返回值。React 会在函数组件每次渲染时调用这个函数，并使用其返回的 JSX 来更新 DOM
  return (
    <div ref={rootRef}>
      {/* 註解要這麼打 */}
      {/* 在 React 中，ref 属性用于获取 DOM 元素或class component 的引用
          塞變數進 ref 屬性中，更新時會塞進rootRef.current(預設唯一屬性) */}
      <h1>For Enumerate</h1>
      {/* 輸出 */}
      <ul>
        {
          // 在 JSX 中，花括号 {} 内可以包含任何有效的 JavaScript 表达式。
          // array.map可以做到類似for的效果
          products.map(
            product => (
              <Enum_item
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            )
          )
        }
      </ul>

      {/* 輸入 */}
      <form onSubmit={handleSubmit}>

        {/* 打字輸入 */}
        <div>
          <input
            type="text"
            value={newProductTitle}
            onChange={handleTitleChange}
            // 外層：<php><?php> 內層：const styles = { marginBottom: '8px', color: 'red'};
            style={{ marginBottom: '8px' }}
            placeholder="Enter product title"
          />

        </div>

        {/* 高亮輸入 */}
        <div>
          <label>
            Is it purple?
            <input
              type="checkbox"
              checked={isPurple}
              onChange={handlePurpleChange}
              style={{ marginLeft: '8px' }}
            />
          </label>
        </div>

        {/* 提交 */}
        <div>
          <button type="submit" style={{ marginTop: '8px' }}>Submit</button>
        </div>

      </form>
    </div>
  );
};

// 輸出元件 ES6 供父元件默認導出選項(否則需要{Enum})，詳見index.js
export default Enum;