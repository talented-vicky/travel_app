export default function Footer({items}) {
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