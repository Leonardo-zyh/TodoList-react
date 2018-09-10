import React, { Component } from 'react';
import 'normalize.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newtodo:'',
      todoLest:[
        
      ]

    }
  }
  render() {
    let todos = this.state.todoLest.map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem content={item} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的代办</h1>
        <div className='wrapper'>
        <TodoInput content={this.state.newtodo} onSubmit={this.addTode.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
  addTode(event){
    this.state.todoLest.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false,
    })
    this.setState({
      newtodo:'',
      todoLest:this.state.todoLest
    })
  }

}

export default App;

let id = 0
function idMaker(){
  id+=1
  return id
}
