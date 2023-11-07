import React from "react";
import { useSelector } from 'react-redux';
import './ItemsBlock.scss';

import { ItemSingle } from '../../index';

function ItemsBlock() {
  const appState = useSelector((state) => state.Reducer);
  const { startItems } = appState;

  const handleMouseDown = (e) =>{
    console.log('handleMouseDown-e',e)
  }

  const renderItems = (arr) =>{
    const result = arr.map((item) => (
      < ItemSingle
        key={item.id}
        style={item.style}
        onMouseDown={handleMouseDown}
      />
    ));

    return result;
  }

  return (
    <div className='items__wrapper'>
      <h2>Figures</h2>
      <p>drag figure to canvas</p>
      <div className='items__container'>
        {renderItems(startItems)}
      </div>
    </div>
  );
}

export default ItemsBlock;
