import React from "react";
import './App.scss';
import './Normalize.scss';

import { Canvas, ItemsBlock } from '../index';

function App() {
  return (
    <div className='container'>
      <ItemsBlock/>
      <Canvas/>
    </div>
  );
}

export default App;
