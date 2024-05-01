import Item from "./Item";
import { useState } from "react";

export default function PackList({items, onDeleteItem, onCheckbox, onClearList}) {
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
