import Button from "./components/Button"
import Shop from "./components/Shop"

function App() {

  return (

   <section className="flex justify-center items-center h-screen">
    <div className="transform -translate-y-10">
      <Button/>
      <div className="mt-8">
        <Shop />
      </div>
    </div>
   </section>

  )
}

export default App