import { useState } from "react";

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
    const userResponse = window.confirm("are you sure")
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

function Header() {
  return <h1 className="header">🌴 Far away 👜 </h1>
}

function Form({onInsertItem}) {
  const [desc, setDesc] = useState("");
  // using controlled elements (i.e giving react control of the element over the DOM)
  // 1 - defining a state
  const [qty, setQty] = useState(1);

  function submitForm(e) {
    e.preventDefault();

    if(desc === "") return;
    const newItem = { id: Date.now(), qty, desc, packed: false }
    onInsertItem(newItem);

    setDesc(""); setQty(1);
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

function PackList({items, onDeleteItem, onCheckbox, onClearList}) {
  const [sort, setSort] = useState("input");

  let sortedItems;
  if(sort === "input") sortedItems = items;

  else if(sort === "desc"){
    sortedItems = items.slice().sort((first, sec) => first.desc.localeCompare(sec.desc))

  } else if(sort === "status"){
    sortedItems = items.slice().sort((first, sec) => -Number(first.packed) +Number(sec.packed))
    // sort to show packed/true first
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(data => 
          <Item 
            item={data} key={data.id} 
            onDeleteItem={() => onDeleteItem(data.id)}
            onCheckbox={onCheckbox}
          />
        )}
      </ul>
      <div>
        <select 
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value={'input'} key={1}> sort by input order </option>
          <option value={'desc'} key={2}> sort by description </option>
          <option value={'status'} key={3}> sort by packed status </option>
        </select>
        <button onClick={onClearList}> clear list </button>
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
  )
}