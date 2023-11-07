import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers';

// const saveState = (state) => {
//   try {
//       // Convert the state to a JSON string 
//       const serialisedState = JSON.stringify(state);

//       // Save the serialised state to localStorage against the key 'app_state'
//       window.localStorage.setItem('app_state', serialisedState);
//   } catch (err) {
//       // Log errors here, or ignore
//   }
// };

const Store = createStore (
  rootReducer,
  composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
  )
);

// Store.subscribe(() => {
//   saveState(Store.getState());
// });

export default Store;