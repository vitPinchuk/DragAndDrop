import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import './ItemSingle.scss';
import { setAddItem,setDxItemToAdd } from '../../../redux/actions/Actions';

function ItemSingle({style,onMouseDown}) {
  const dispatch = useDispatch();

  const handleDragStart = e =>{
    let { offsetX, offsetY } = e.nativeEvent
    let NewDxObj = {
      x:offsetX,
      y:offsetY,
    }
    dispatch(setDxItemToAdd(NewDxObj))
    dispatch(setAddItem(style))
  }

  return (
    <div  draggable onDragStart={handleDragStart} onMouseDown={onMouseDown} className={style === 'circle' ? 'item__circle' : 'item__square'} />
  );
}

export default ItemSingle;