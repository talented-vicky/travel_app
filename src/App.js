import { useState } from "react";

const initItems = [
  {
    id: 1, desc: "passports", qty: 2, packed: false
  },
  {
    id: 2, desc: "socks", qty: 12, packed: true
  },
  {
    id: 3, desc: "wallet", qty: 3, packed: false
  },
]

export default function App() {
  return (
    <div className="app">
      <Header></Header>
      <Form></Form>
      <PackList></PackList>
      <Footer></Footer>
    </div>
  )
}

function Header() {
  return <div>🌴 Far away 👜 </div>
}
function Form() {
  const [desc, setDesc] = useState("");
  // using controlled elements (i.e giving react control of the element over the DOM)
  // 1 - defining a state
  const [qty, setQty] = useState(3);

  function submitForm(e) {
    e.preventDefault();
    if(desc === ""){
      return;
    }
    const newItem = {
      id: Date.now(), 
      qty, desc, 
      packed: false
    }
    console.log(newItem);
    setDesc(""); setQty(3);
    // initItems.push(newItem);
  }

  return (
    <form className="form" onSubmit={ submitForm }>
      <h3> what're you taking for your trip? </h3>
      <select
        value={qty} 
        // 2- force form tag (select) to always take the init state value
        onChange={e => setQty(e.target.value)}
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
function PackList() {
  return (
    <div className="list">
      <ul>
        {initItems.map(data => 
          <Item item={data} key={data.id}/>
        )}
      </ul>
    </div>
  )
}
function Item({item}) {
  return <li>
      <span 
        style={{textDecoration: item.packed? "line-through" : ""}} > 
        {item.qty} {item.desc} 
      </span>
      <button> ❌ </button>
    </li>
}
function Footer() {
  return (
    <footer className="stats">
      <em> You have {initItems.length} items from list </em>
    </footer>
  )
}