import { useState } from "react";

export default function Form({onInsertItem}) {
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