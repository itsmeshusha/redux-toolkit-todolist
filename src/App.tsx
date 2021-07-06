import React from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";

function App() {
  return (
    <div className="App">
      <Todolist title={'What to do?'} />
      <Todolist title={'What to buy?'} />
      <Todolist title={'What to learn?'} />
    </div>
  );
}

export default App;
