
import { Link, Route, BrowserRouter as Router, Routes} from "react-router-dom"
import HomeScreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar,Container, NavbarBrand, Nav, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useContext } from "react";
import { Store } from "./store";
import CartScreen from "./screens/cartScreen";
import SignInScreen from "./screens/signInScreen";

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <Router>
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark" className="nav-bar">
          <Container>
            <LinkContainer to={'/'}>
            <NavbarBrand>amazona</NavbarBrand>
            </LinkContainer>
            <Nav>
              <Link to={'/cart'} className="nav-link">
                Cart
                {cart.cartItems.length> 0 &&(
                  <Badge pill bg="success">
                    {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
        
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="product/:slug" element={<ProductScreen/>}/>
            <Route path="/cart" element={<CartScreen/>}/>
            <Route path="/signin" element={<SignInScreen/>}/>
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">all right reserved</div>
      </footer>
    </div>
    </Router>
   
  )
}

export default App
