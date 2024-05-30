import React, { useState, useRef, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input, Checkbox, List, Layout, theme } from 'antd';
import Enum_item from './Enum_item';
const Arr_Prod = [
    { title: 'Cabbage', purple: false, id: 1 },
    { title: 'Garlic', purple: false, id: 2 },
    { title: 'Apple', purple: true, id: 3 },
];
// 物件本身
const Antd_Enum = () => {
    // 解構賦值：const [狀態變數名, 更新函數名] = useState(初始值);
    const [products, setProducts] = useState(Arr_Prod);
    const [newProductTitle, setNewProductTitle] = useState('');
    const [isPurple, setPurple] = useState(false);

    // useRef 可用於 存取不渲染變數/取得DOM資料
    const nextId = useRef(products.length + 1);
    const rootRef = useRef(null);
    const formRef = useRef(null);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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

    const handleFormSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    // render
    return (
        <div ref={rootRef} >
            <h1>For Antd_Enum</h1>
            <Layout style={{ height: '400px', overflowY: 'auto', borderRadius: borderRadiusLG }}>
                <List
                    size="small"
                    bordered
                    dataSource={products}
                    renderItem={(product) => (
                        <Enum_item
                            key={product.id}
                            product={product}
                            handleDelete={handleDelete}
                        />
                    )}
                />
            </Layout>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div>
                    <Input
                        placeholder="Enter product title"
                        type="text"
                        value={newProductTitle}
                        onChange={handleTitleChange}
                        style={{ marginBottom: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '8px' }}>
                    <label>
                        <Checkbox
                            checked={isPurple}
                            onChange={handlePurpleChange}
                        />
                        Is it purple?
                    </label>
                </div>
                <Tooltip title="Add product">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={handleFormSubmit} />
                </Tooltip>
            </form>
        </div>
    );
};

export default Antd_Enum;