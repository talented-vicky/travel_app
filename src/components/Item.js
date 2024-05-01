export default function Item({item, onDeleteItem, onCheckbox}) {
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