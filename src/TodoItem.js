import React, { Component } from 'react';
import './TodoItem.css'

export default class TodoItem extends Component {
    render() {
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.content.status === 'completed'}
                    onChange={this.toggle.bind(this)} />                    
                <span className="title">{this.props.content.title}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    toggle(e) {
        this.props.onToggle(e, this.props.content)
    }
    delete(e) {
        this.props.onDelete(e, this.props.content)
    }
}