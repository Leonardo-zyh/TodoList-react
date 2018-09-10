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
          <TodoItem content={item} onToggle={this.toggle.bind(this)} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的代办</h1>
        <div className='wrapper'>
        <TodoInput content={this.state.newtodo}
        onChange={this.changeTitle.bind(this)}
        onSubmit={this.addTode.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }

  toggle(e,content){
    content.status = content.status=== 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  changeTitle(event){
    this.setState({
      newtodo:event.target.value,
      todoLest:this.state.todoLest
    })
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
