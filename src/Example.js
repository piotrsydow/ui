import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Bar from "./Bar";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

const addItem = (name, price) => {
  return {
    type: "ADD_ITEM",
    item: {
      name: name,
      price: price
    }
  };
};

const deleteItem = index => {
  return {
    type: "DELETE_ITEM",
    index: index
  };
};

export const reducer = (state = { items: [] }, action) => {
  console.log("reducer");
  console.log(state);
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.item] };
    case "DELETE_ITEM":
      return {
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

const Item = props => {
  return (
    <div>
      Item : {props.name} | {props.price}
      <button onClick={() => props.onDelete(props.index)}> Delete </button>
    </div>
  );
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "a", price: "b" };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangePrice(event) {
    this.setState({ price: event.target.value });
  }

  addItem() {
    this.props.onAdd(this.state.name, this.state.price);
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChangeName.bind(this)}
          value={this.state.name}
        />
        <input
          onChange={this.handleChangePrice.bind(this)}
          value={this.state.price}
        />
        <button onClick={() => this.addItem()}>Add</button>
      </div>
    );
  }
}

const ItemList = props => {
  console.log("ItemList");
  console.log(props);
  console.log("------------------");
  return (
    <div>
      <Input onAdd={props.onAdd} />
      {props.items.map((item, index) => {
        return (
          <Item
            key={index}
            onDelete={props.onDelete}
            index={index}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  console.log("mapStateToProps:example");
  console.log(state);
  console.log("--------------");
  var x = {
    items: state.example.items
  };
  return x;
};

const mapDispachToProps = dispach => {
  var x = {
    onAdd: (name, price) => {
      console.log("Add");
      dispach(addItem(name, price));
    },
    onDelete: id => {
      dispach(deleteItem(id));
    }
  };
  console.log(x);
  return x;
};

export const ItemListContainer = connect(
  mapStateToProps,
  mapDispachToProps
)(ItemList);
