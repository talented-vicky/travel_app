import { useState } from "react";

// const initItems = [
//   {
//     id: 1, desc: "passports", qty: 2, packed: false
//   },
//   {
//     id: 2, desc: "socks", qty: 12, packed: true
//   },
//   {
//     id: 3, desc: "wallet", qty: 3, packed: false
//   },
// ]

export default function App() {
  const [items, setItems] = useState([]);
  
  function handleInsertItem (item){
    setItems(existingItem => [...existingItem, item]);
    // setItems(existingItem => existingItem.push(item));
    // above won't work cause state can't undergo mutation, hence
    // the need for immuatable data edit
  }
  function handleDeleteItem (id){
    setItems(existingItem => existingItem.filter(data => data.id !== id))
  }

  function handleCheckbox (id){
    setItems(existingItem => existingItem.map(data => data.id === id ?
      {
        ...data,
        packed: !data.packed
      }
      : data
    ))
  }

  return (
    <div className="app">
      <Header></Header>
      <Form onInsertItem={handleInsertItem}></Form>
      <PackList 
        items={items} 
        onDeleteItem={handleDeleteItem}
        onCheckbox={handleCheckbox}
        >
      </PackList>
      <Footer items={items}></Footer>
    </div>
  )
}

function Header() {
  return <h1 className="header">🌴 Far away 👜 </h1>
}

function Form({onInsertItem}) {
  const [desc, setDesc] = useState("");
  // using controlled elements (i.e giving react control of the element over the DOM)
  // 1 - defining a state
  const [qty, setQty] = useState(3);

  function submitForm(e) {
    e.preventDefault();

    if(desc === ""){ return; }
    const newItem = { id: Date.now(), qty, desc, packed: false }
    onInsertItem(newItem);

    setDesc(""); setQty(3);
  }

  return (
    <form className="form" onSubmit={ submitForm }>
      <h3> what're you taking for your trip? </h3>
      <select
        value={qty} 
        // 2- force form tag (select) to always take the init state value
        onChange={e => setQty(Number(e.target.value))}
        // 3- update the select state using the onchange property
      >
        {
          Array.from(
            {length: 10}, // array length
            (_, ind) => ind + 1 // array callback function
          ).map(
            num => ( <option value={num} key={num}>{num}</option> )
          )
        }
      </select>
      <input 
        type="text" placeholder="item..." 
        value={desc} 
        // 2- force form tag (input) to always take the init state value
        onChange={e => setDesc(e.target.value)}
        // 3- update the input state using the onchange property
      />
      <button> Add </button>
    </form >
  )
}

function Item({item, onDeleteItem, onCheckbox}) {
  
  return <li>
      <input 
        type="checkbox" 
        value={item.packed}
        onChange={() => onCheckbox(item.id)}
      >
      </input>
      <span 
        style={{textDecoration: item.packed? "line-through" : ""}} > 
        {item.qty} {item.desc} 
      </span>
      <button onClick={onDeleteItem}> ❌ </button>
    </li>
}

function PackList({items, onDeleteItem, onCheckbox}) {
  return (
    <div className="list">
      <ul>
        {items.map(data => 
          <Item 
            item={data} key={data.id} 
            onDeleteItem={() => onDeleteItem(data.id)}
            onCheckbox={onCheckbox}
          />
        )}
      </ul>
      <div>
        <select>
          <option value={1}> sort by input order </option>
          <option value={2}> sort by description </option>
          <option value={3}> sort by packed status </option>
        </select>
        <button 
          // onClick={}
        > clear list </button>
      </div>
    </div>
  )
}

function Footer({items}) {
  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length
  const percentagePacked = Math.round((packedItems / totalItems) * 100)

  return (
    <footer className="stats">
      {
        !totalItems ? <em> Nothing packed yet, start adding items </em>
        : <em> 
          {
            percentagePacked === 100 ? `Done packing! ✈`
            : `You have ${items.length} item(s) on your list 😎, and have packed ${packedItems} (${totalItems !== 0 ? percentagePacked : 0 }%)`
          }
        </em>
      }
    </footer>
    // <footer className="stats">
    //   <em> You have {items.length} items on your list, and havepacked {
    //     items.filter(item => item.packed === true).reduce((cumm, item) => cumm + item.qty, 0)
    //   } ({
    //     totalItems !== 0 ?
    //     Math.round((items.filter(item => item.packed === true).reduce((cumm, item) => cumm + item.qty, 0)
    //     /
    //     items.reduce((cumm, item) => cumm + item.qty, 0)) * 100).toFixed(2)
    //     : 0
    //   }%) 
    //   </em>
    // </footer>
  )
}