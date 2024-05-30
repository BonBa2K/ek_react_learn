

import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Card, Checkbox } from 'antd';

// 使用 React.memo 包裹。这使得 Enum_item 组件在相同的 props 时不会重新渲染，从而优化性能。
// React中預設父物件重新渲染時，子物件都要重渲染一次
// 資料傳遞比較不便，推薦找資料傳遞之類的
// memo(Component, arePropsEqual?)，只要組件的props (如product, handleDelete) 沒變就不渲染

const Enum_item = React.memo(({ product, handleDelete }) => {
    // 檢查是否每次都會render
    console.log(`Rendering item: ${product.title}`);

    // render
    return (
        <List.Item style={{ display: 'flex', justifyContent: 'center'}}>
            <Card style={{ width: '100%', color: product.purple ? 'magenta' : 'darkgreen' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}> {product.title}</span>
                    <Button
                        type="link"
                        onClick={() => handleDelete(product.id)}
                        style={{
                            border: '1px solid #d9d9d9',
                            padding: '0 8px',
                            marginTop: '0'
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        </List.Item >
        // <li style={{ color: product.purple ? 'magenta' : 'darkgreen' }} >
        //     <span>{product.title}</span>
        //     <button onClick={() => handleDelete(product.id)}>kill</button>
        // </li>
    );
});

// 檢查輸入資料，不對會報warning
// 第一段代码：title 是一个可以是 string 或 number 的单一值。
// 示例：{ title: "apple" } 或 { title: 42 }

// 第二段代码：title 是一个array，array中的每个元素可以是 string 或 number。
// 示例：{ title: ["apple", 42, "banana"] }
Enum_item.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        purple: PropTypes.bool,
        id: PropTypes.number.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func,
};

// 輸出元件 ES6 供父元件默認導出選項(否則需要{Enum})，詳見index.js
export default Enum_item;
