import React,{ Component } from 'react';
import './TodoItem.css'
export default class TodoInput extends Component {
    render(){
        return (<input type='text' defaultValue={this.props.content} 
        placeholder="What need to do?"
        className="TodoInput"
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}/>)  
    }
    submit(e){
        if(e.key==='Enter'){    //trim()就是字符串去除字符串最左边和最右边的空格
            if(e.target.value.trim() !==''){
                //console.log(e.target.value);               
                this.props.onSubmit(e)
            }
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}
