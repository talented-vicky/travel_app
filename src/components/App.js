import { useState } from "react";
import Header from "./Header"
import Form from "./Form";
import Footer from "./Footer";
import PackList from "./PackList";

export default function App() {
  const [items, setItems] = useState([]);
  
  function handleInsertItem (item){
    setItems(existingItems => [...existingItems, item]);
    // setItems(existingItem => existingItem.push(item));
    // above won't work cause state can't undergo mutation, hence
    // the need for immuatable data edit
  }

  function handleDeleteItem (id){
    setItems(existingItems => existingItems.filter(data => data.id !== id))
  }

  function handleCheckbox (id){
    setItems(existingItems => existingItems.map(data => data.id === id ?
      {
        ...data,
        packed: !data.packed
      }
      : data
    ))
  }

  function handleClearList(){
    const userResponse = window.confirm("Are you sure you want to clear the list?")
    if(userResponse)
    // setItems(items.filter(item => !item))
    setItems([])
  }

  return (
    <div className="app">
      <Header></Header>
      <Form onInsertItem={handleInsertItem}></Form>
      <PackList 
        items={items} 
        onDeleteItem={handleDeleteItem}
        onCheckbox={handleCheckbox}
        onClearList={handleClearList}
        >
      </PackList>
      <Footer items={items}></Footer>
    </div>
  )
}