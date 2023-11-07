export const setDxItemToAdd = data => {
  return {
    type: 'SET_DX_ITEM_TO_ADD',
    payload: data
  }
}
export const setAddItem = data => {
  return {
    type: 'SET_ADD_ITEM',
    payload: data
  }
}
export const setDragItem = data => {
  return {
    type: 'SET_DRAG_ITEM',
    payload: data
  }
}
export const setIsDown = data => {
  return {
    type: 'SET_IS_DOWN',
    payload: data
  }
}
export const setItemsAtCanvas = data => {
  return {
    type: 'SET_ITEMS_AT_CANVAS',
    payload: data
  }
}
export const setStartMove = data => {
  return {
    type: 'SET_START_MOVE',
    payload: data
  }
}
export const deleteItem = () => {
  return {
    type: 'DELETE_ITEM'
  }
}
export const AddNewItem = data => {
  return {
    type: 'ADD_NEW_ITEM',
    payload: data
  }
}