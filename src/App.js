import React, { Component } from 'react';
import 'normalize.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newtodo:'test',
      todoLest:[
        {id:1,title:'第一个代办'},
        {id:1,title:'第二个代办'},
      ]

    }
  }
  render() {
    let todos = this.state.todoLest.map((item,index)=>{
      return (
        <li>
          <TodoItem content={item} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的代办</h1>
        <div className='wrapper'>
        <TodoInput content={this.state.newtodo} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }

}

export default App;