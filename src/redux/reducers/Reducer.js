const items = [
  {
      id: '1c',
      style: 'circle',
  },
  {
      id: '2s',
      style: 'square',
  }
]

const initialState = {
  startItems:items,
  itemsAtCanvas:JSON.parse(window.localStorage.getItem('itemsAtCanvas')) || [],
  styleItemToAdd:'',
  itemToDrag:null,
  startMoveCoordinate:{
    x:0,
    y:0,
  },
  itemToAddDX:{x:0,y:0},
  cursorAtItem:false,
  cursorDown:false,
};

export const Reducer = (state = initialState, action) => {
  console.log('Reducer-initialState', initialState)
  const {payload} = action;
  switch(action.type){
    case 'SET_ADD_ITEM':
      return {...state,styleItemToAdd: payload}
    case 'SET_DX_ITEM_TO_ADD':
      return {...state,itemToAddDX: payload}
    case 'SET_DRAG_ITEM':
      return {...state,itemToDrag: payload}
    case 'SET_IS_DOWN':
      return {...state,cursorDown: payload}
    case 'SET_ITEMS_AT_CANVAS':
      return {...state,itemsAtCanvas: payload}
    case 'SET_START_MOVE':
      return {...state,startMoveCoordinate: payload}
    case 'ADD_NEW_ITEM':
      return {...state,itemsAtCanvas: [...state.itemsAtCanvas, payload]}
    case 'DELETE_ITEM':
      return {...state,
        itemsAtCanvas: state.itemsAtCanvas.filter(elem => elem.id !== state.itemToDrag.id),
        itemToDrag:{}
      }
    default:
      return {...state}
  }
}

