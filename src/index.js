// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// jsx中的自製組件規定第一個字母需大寫
import Tmp from './Tmp';
import Ani from './Ani';
import Antd_Enum from './Antd_Enum';
import Enum from './Enum';

// document.body.style.backgroundImage = 'url("https://lh3.googleusercontent.com/a/ACg8ocI3Rje97fbHP2tWecbfsd-2vtwKaSII22tRDet_9IzI8fMrRfzz=s360-c-no")';
// document.body.style.backgroundSize = 'cover';
// document.body.style.backgroundPosition = 'center';
// document.body.style.backgroundRepeat = 'no-repeat';
// document.body.style.height = '90vh';
document.body.style.backgroundColor = 'yellow';

//僅影響id叫root的文件
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode >
    {/* <Ani />*/}
    {/* <Enum /> */}
    {/* <Tmp /> */}
    <Antd_Enum />
  </React.StrictMode>
);

//  Hooks 是 React 16.8 新增的
//  函数组件

//  React 生命週期方法（例如，componentDidMount）不能在功能元件中使用。
//  詳見：https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components/
//  优点：
//   1.简洁性：
//     代码结构更简单，没有类的语法和生命周期方法的复杂性。

//   2.ReactHooks：
//     通过 Hooks（如 useState、useEffect 等），函数组件可以实现类组件的所有功能，

//   3.性能較好

//  缺點：
//   1.过度使用 Hooks：
//     复杂的组件可能会使用多个 Hooks，导致代码变得混乱和难以管理

// 類组件
// 老字號