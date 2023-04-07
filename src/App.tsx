import CardList from "./components/CardList";

function App() {

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <CardList isOpen={false}/>
    </h1>
  )
}

export default App
