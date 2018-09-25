import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'
``

class App extends Component {   //React,createClass()
  constructor(props){
    super(props)
    this.state = {
      user:getCurrentUser() || {},
      newtodo:'', 
      todoList: [],
    }
  let user = getCurrentUser()
  if(user){
    TodoModel.getByUser(user,(todos)=>{
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.todoList = todos
      this.setState(stateCopy)
    })
  }
  }

  render() {
    let todos = this.state.todoList

    .filter((item)=> !item.deleted)
    .map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
          onDelete={this.deleted.bind(this)} />
        </li>
      )
    })
    return (
      <div className="App">
      <div className='username'> {this.state.user.username || '我'}</div>
        <h1>To-Do
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}         
        </h1>
        <div className='inputWrapper'>
        <TodoInput  content={this.state.newtodo}
        onChange={this.changeTitle.bind(this)}
        onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className='todoList' >
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog
          onSignIn={this.onSignUpOrSignIn.bind(this)} 
          onSignUp={this.onSignUpOrSignIn.bind(this)}
           />}
      </div>
    );
  }
  
  

  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)  
  }
  componentDidUpdate() {   
  }
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.updata(todo,()=>{
      this.setState(this.state)
    },(error)=>{
      todo.state = oldStatus
      this.setState(this.state)
    })    
    
  }
  changeTitle(event){
    this.setState({
      newtodo:event.target.value,
      todoList:this.state.todoList
    })
  }
  addTodo(event){
    let newTodo={
     
      title:event.target.value,
      status:'',
      deleted:false,
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo:'',
        todoList:this.state.todoList,
      })
    },(error)=>{
      console.log(error);
      
    })
    
  }
  deleted(event,todo){
    TodoModel.destroy(todo.id,()=>{
      todo.deleted = true
      this.setState(this.state)
    })
  }
}

export default App;

