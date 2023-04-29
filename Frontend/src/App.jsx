
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom"
import HomeScreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
    <div>
      <header>
        <Link to="/">AMAZONA</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="product/:slug" element={<ProductScreen/>}/>
        </Routes>
      </main>
    </div>
    </Router>
   
  )
}

export default App
