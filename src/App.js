import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStorage'

import AV from 'leancloud-storage'
var APP_ID = '1tQJosYf47DrGlSBzUF0hkRm-gzGzoHsz';
var APP_KEY = '5zJnoxUAoJD4DV1K28et83WV';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
 

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newtodo:'', 
      todoLest: []
    }
  }
  render() {
    let todos = this.state.todoLest

    .filter((item)=> !item.deleted)
    .map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem content={item} onToggle={this.toggle.bind(this)} 
          onDelete={this.deleted.bind(this)} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的代办</h1>
        <div className='wrapper'>
        <TodoInput content={this.state.newtodo}
        onChange={this.changeTitle.bind(this)}
        onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className='todoList' >
          {todos}
        </ol>
      </div>
    );
  }

  componentDidUpdate() {
    localStore.save('todoList', this.state.todoList)
  }
  toggle(e,content){
    content.status = content.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    
  }
  changeTitle(event){
    this.setState({
      newtodo:event.target.value,
      todoLest:this.state.todoLest
    })
  }
  addTodo(event){
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
  deleted(event,todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;

let id = 0
function idMaker(){
  id+=1
  return id
}
