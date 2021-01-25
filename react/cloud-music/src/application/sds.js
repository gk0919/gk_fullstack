在 baseUI 文件夹下新建 horizen-item 目录，接着新建 index.js。

首先分析这个基础组件接受哪些参数，

import React, { useState, useRef, useEffect, memo } from 'react';
import styled from'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

function Horizen (props) {
  return (
    // 暂时省略
  )
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};
export default memo (Horizen);
现在，来把 props 对象进行解构赋值，

const { list, oldVal, title } = props;
const { handleClick } = props;
返回的 JSX 代码为:

return ( 
  <Scroll direction={"horizental"}>
    <div>
      <List>
        <span>{title}</span>
        {
          list.map ((item) => {
            return (
              <ListItem 
                key={item.key}
                className={`${oldVal === item.key ? 'selected': ''}`} 
                onClick={() => handleClick (item.key)}>
                  {item.name}
              </ListItem>
            )
          })
        }
      </List>
    </div>
  </Scroll>
);
样式代码:

// 由于基础组件样式较少，直接写在 index.js 中
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style ["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style ["theme-color"]};
    border: 1px solid ${style ["theme-color"]};
    opacity: 0.8;
  }
`
现在大家还看不到效果，可能会有些慌张，没关系，我们现在就把这个组件进入到页面中试一试。

载入页面
进入到 application/Singers/index.js 中，代码如下:

import React from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes } from '../../api/config';

function Singers () {
  return (
    <Horizen list={categoryTypes} title={"分类 (默认热门):"}></Horizen>
  )
}

export default React.memo (Singers);
分类数据在 api/config.js 中，但现在还没定义，现在在这个文件中添加以下代码:

// 歌手种类
export const categoryTypes = [{
  name: "华语男",
  key: "1001"
},
{
  name: "华语女",
  key: "1002"
},
{
  name: "华语组合",
  key: "1003"
},
{
  name: "欧美男",
  key: "2001"
},
{
  name: "欧美女",
  key: "2002"
},
{
  name: "欧美组合",
  key: "2003"
},
{
  name: "日本男",
  key: "6001"
},
{
  name: "日本女",
  key: "6002"
},
{
  name: "日本组合",
  key: "6003"
},
{
  name: "韩国男",
  key: "7001"
},
{
  name: "韩国女",
  key: "7002"
},
{
  name: "韩国组合",
  key: "7003"
},
{
  name: "其他男歌手",
  key: "4001"
},
{
  name: "其他女歌手",
  key: "4002"
},
{
  name: "其他组合",
  key: "4003"
},
];

// 歌手首字母
export const alphaTypes = [{
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];
解决滚动问题
启动项目，进入歌手列表页后，你发现这个横向列表并不能滚动，我们再回顾下 better-scroll 的 (横向) 滚动原理，首先外面容器要宽度固定，其次内容宽度要大于容器宽度。

因此目前存在两个问题:

外部容器未限定宽度，也就是两个 Horizen 外面包裹的 div 元素。
内部宽度没有进行相应的计算，始终为屏幕宽度。
现在就分别来解决这两个问题。

首先，新建 Singers/style.js 并增加：

import styled from'styled-components';
import style from '../../assets/global-style';

export const NavContainer  = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
在 Singers/index.js 中使用:

import { NavContainer } from "./style";

//...
// 返回的 JSX
return (
  <NavContainer>
    <Horizen list={categoryTypes} title={"分类 (默认热门):"}></Horizen>
    <Horizen list={alphaTypes} title={"首字母:"}></Horizen>
  </NavContainer>
)
//...
接下来 ，我们进入 baseUI/horizen-item/index.js 中:

// 加入声明
const Category = useRef (null);

// 加入初始化内容宽度的逻辑
useEffect (() => {
  let categoryDOM = Category.current;
  let tagElems = categoryDOM.querySelectorAll ("span");
  let totalWidth = 0;
  Array.from (tagElems).forEach (ele => {
    totalWidth += ele.offsetWidth;
  });
  categoryDOM.style.width = `${totalWidth}px`;
}, []);

// JSX 在Scroll下面，对第一个 div 赋予 ref
<Scroll direction={"horizental"}>
  <div ref={Category}></div>