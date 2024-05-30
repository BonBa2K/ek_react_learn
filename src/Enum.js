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
const Enum = () => {

  // 解構賦值：const [狀態變數名, 更新函數名] = useState(初始值);
  const [products, setProducts] = useState(Arr_Prod);
  const [newProductTitle, setNewProductTitle] = useState('');
  const [isPurple, setPurple] = useState(false);

  // useRef 可用於 存取不渲染變數/取得DOM資料
  const nextId = useRef(products.length + 1);
  const rootRef = useRef(null);

  // handler
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

  // render
  return (
    <div ref={rootRef}>
      <h1>For Enumerate</h1>
      {/* 輸出 */}
      <ul>
        {
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

export default Enum;