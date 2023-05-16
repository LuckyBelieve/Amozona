import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeScreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import {
  Navbar,
  Container,
  NavbarBrand,
  Nav,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./store";
import CartScreen from "./screens/cartScreen";
import SignInScreen from "./screens/signInScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingScreen from "./screens/shippingScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const handleSignout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" className="nav-bar">
            <Container>
              <LinkContainer to={"/"}>
                <NavbarBrand>amazona</NavbarBrand>
              </LinkContainer>
              <Nav>
                <Link to={"/cart"} className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to={"/profile"}>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={"/orderhIstory"}>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      onClick={handleSignout}
                      to={"#signout"}
                    >
                      Sign out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className=" nav-link" to={"/signin"}>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">all right reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
