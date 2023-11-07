import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Canvas.scss';
import {
  deleteItem,
  setStartMove,
  setItemsAtCanvas,
  setIsDown,
  setDragItem,
  AddNewItem
} from '../../redux/actions/Actions';

function Canvas() {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.Reducer);
  const { styleItemToAdd, itemToAddDX, startMoveCoordinate, itemsAtCanvas, cursorDown, itemToDrag } =
    appState;

  let width = '700px';
  let height = '500px';

  const handleMouseMove = (e) => {
    if (!cursorDown) return;

    if (cursorDown && itemToDrag !== null) {
      let itemsAtCanvasCopy = [...itemsAtCanvas];
      let startMoveCoordinateCopy = startMoveCoordinate;
      let currentDragItem = itemsAtCanvasCopy.find(
        (elem) => elem.id === itemToDrag.id
      );

      let moveX = parseInt(
        e.nativeEvent.offsetX - canvasRef.current.clientLeft
      );
      let moveY = parseInt(e.nativeEvent.offsetY - canvasRef.current.clientTop);
      let dx = moveX - parseInt(startMoveCoordinateCopy.x);
      let dy = moveY - parseInt(startMoveCoordinateCopy.y);

      startMoveCoordinateCopy.x = moveX;
      startMoveCoordinateCopy.y = moveY;
      currentDragItem.x += dx;
      currentDragItem.y += dy;
      dispatch(setStartMove(startMoveCoordinateCopy));
      dispatch(setItemsAtCanvas(itemsAtCanvasCopy));
    }
  };

  const handlerDragOver = (e) => {
    e.preventDefault()
  }

  const handlerOnDrop = (e) => {
    const styleItemToAddCopy = styleItemToAdd
    const itemToAddDXCopy = itemToAddDX
    let { offsetX, offsetY } = e.nativeEvent;
    let dx = null;
    let dy = null;
    // Calculate the necessary center relative to the object capture and its transfer to the canvas
    if (styleItemToAddCopy === 'square'){
      dx = offsetX - itemToAddDXCopy.x
      dy = offsetY - itemToAddDXCopy.y
    }else {
      dx = offsetX + (35-itemToAddDXCopy.x)
      dy = offsetY + (35-itemToAddDXCopy.y)
    }
    const newItemToCanvas = {
      x: dx,
      y: dy,
      style:styleItemToAddCopy,
      id:new Date().valueOf()
    }
    dispatch(AddNewItem(newItemToCanvas))
  }
  
  const handleMouseLeave = (e) => {
    if (cursorDown && itemToDrag !== null) {
      dispatch(deleteItem());
      dispatch(setIsDown(false));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Delete' && itemToDrag !== null) {
      dispatch(deleteItem());
    }
  };

  const handleMouseUp = (e) => {
    dispatch(setIsDown(false));
  };

  const isItemClick = (x, y, item) => {
    let isTarget = false;
    // Calculate whether the object was clicked or not, depending on the type of object
    if (item.style === 'circle') {
      let dx = item.x - x;
      let dy = item.y - y;
      if (dx * dx + dy * dy < 35 * 35) {
        dispatch(setDragItem(item));
        isTarget = true;
      }
    } else {
      if (x >= item.x && x <= item.x + 70 && y >= item.y && y <= item.y + 70) {
        dispatch(setDragItem(item));
        isTarget = true;
      }
    }
    return isTarget;
  };

  const handleMouseDown = (e) => {
    let { offsetX, offsetY } = e.nativeEvent;
    let startX = parseInt(offsetX - canvasRef.current.clientLeft);
    let startY = parseInt(offsetY - canvasRef.current.clientTop);
    const testArrayCoppy = [...itemsAtCanvas];
    for (let i = 0; i < testArrayCoppy.length; i++) {
      const item = testArrayCoppy[i];
      let result = isItemClick(startX, startY, item);
      if (result) {
        //rewriting items array - set selected item  at the end array
        let itemIndex = testArrayCoppy.findIndex((elem) => elem.id === item.id);
        testArrayCoppy.splice(itemIndex, 1);
        testArrayCoppy.push(item);
        let startCoordinate = {
          x: startX,
          y: startY,
        };
        dispatch(setStartMove(startCoordinate));
        dispatch(setItemsAtCanvas(testArrayCoppy));
        dispatch(setIsDown(true));
        break;
      }
    }
  };

  const drawSquare = (ctx, obj) => {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, 70, 70);
    ctx.closePath();
    ctx.fillStyle = '#2E86C1';
    ctx.strokeStyle = 'grey';
    ctx.fill();
    ctx.stroke();
  };

  const drawCircle = (ctx, obj) => {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 35, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = '#28B463';
    ctx.strokeStyle = 'grey';
    ctx.fill();
    ctx.stroke();
  };

  const drawOneItem = (ctx, obj) => {
    // line width
    ctx.lineWidth = 1;
    if ( itemToDrag !== null && obj.id === itemToDrag.id) {
      // set line width for selected item
      ctx.lineWidth = 5;
    }
    if (obj.style === 'circle') {
      drawCircle(ctx, obj);
    } else {
      drawSquare(ctx, obj);
    }
  };

  const drawItems = (ctx, itemsArray) => {
    console.log('drawItems');

    ctx.beginPath();
    itemsArray.forEach((item) => {
      drawOneItem(ctx, item);
    });
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    ctx.beginPath();
    drawItems(ctx, itemsAtCanvas);
  }, [itemsAtCanvas, itemToDrag]);

  useEffect(() => {
    window.localStorage.setItem('itemsAtCanvas', JSON.stringify(itemsAtCanvas));
  }, [itemsAtCanvas]);

  return (
    <div className='canvas_wrapper'>
      <h2>Canvas</h2>
      <canvas
        tabIndex='0'
        className='canvas_item'
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onKeyUp={handleKeyPress}
        onDragOver={handlerDragOver}
        onDrop={handlerOnDrop}
        width={width}
        height={height}
      ></canvas>
    </div>
  );
}

export default Canvas;
