import { useContext } from "react";
import { Store } from "../store";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import MessageBox from "../components/messageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { burl } from "../utils/url";
const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateHandler = async (item, quantity) => {
    const { data } = await axios.get(burl + `/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("sorry, the product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const handleDelete = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkOutHandler = ()=>{
    navigate("/signin?redirect=/shipping");
  }
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              cart is empty .<Link to={"/"}>Go shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() => updateHandler(item, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => updateHandler(item, item.quantity + 1)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => handleDelete(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <h2>
                  Subtotal:({cartItems.reduce((a, c) => a + c.quantity, 0)}
                  {"  "}
                  items):$
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h2>
              </ListGroup.Item>
              <ListGroupItem>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="success"
                    onClick={checkOutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
