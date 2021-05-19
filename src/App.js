import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: 'Mua bim bim', isComplete: true },
        { title: 'Mua kẹo mút', isComplete: true },
        { title: 'Đi xem phim', isComplete: false },
      ],
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state; //hoac co the viet: const todoItems = this.state.todoItems
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      // enter key
      let text = event.target.value;
      if (!text) {
        return;
      }

      text = text.trim();
      if (!text) {
        return;
      }

      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems,
        ],
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  render() {
    const { todoItems, newItem } = this.state;
    if (todoItems.length) {
      return (
        <div className="App">
          <div className="Header">
            <img alt="icon" src={tick} width={32} height={32} />
            <input
              type="text"
              placeholder="Add a new item"
              onKeyUp={this.onKeyUp}
              value={newItem}
              onChange={this.onChange}
            />
          </div>
          {todoItems.length &&
            todoItems.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)}
              />
            ))}
        </div>
      );
    } else {
      return <div className="App">Nothing here</div>;
    }
  }
}

export default App;
