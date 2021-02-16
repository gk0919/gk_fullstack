import React from 'react'
import Horizen from '../../baseUI/horizen-item'
import {categoryTypes, alphaTypes} from '../../api/config'


function Singers() {
  return (
    <Horizen list={categoryTypes} title={"分类(默认热门)"}></Horizen>
  )
}

export default React.memo(Singers)