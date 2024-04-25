const initItems = [
  {
    id: 1, 
    desc: "passports", 
    qty: 2, 
    packed: false
  },
  {
    id: 2, 
    desc: "socks", 
    qty: 12, 
    packed: false
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
  return (
    <div className="form">
      <h3> what're you taking for your trip? </h3>
    </div>
  )
}
function PackList() {
  return (
    <div className="list">
      <ul>
        {initItems.map(data => 
          <Item item={data}/>
        )}
      </ul>
    </div>
  )
}
function Item({item}) {
  return <li> {item.desc} <span> -- {item.qty} </span></li>
}
function Footer() {
  return (
    <footer className="stats">
      <em> You have 13 items from list </em>
    </footer>
  )
}