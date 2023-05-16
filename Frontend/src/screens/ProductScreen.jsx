import { useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducer/reducer";
import axios from "axios";
import { burl } from "../utils/url";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";
import { getError } from "../utils/getError";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";

const ProductScreen = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;
  const [{ loading, isError, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    isError: "",
  });
  const product = products;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const results = await axios.get(burl + `/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: results.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart} = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(x=>x._id === product._id);
      const quantity = existItem ? existItem.quantity +1 : 1;
      const {data} = await axios.get(burl+`/api/products/${product._id}`);
      if(data.countInStock < quantity){
        window.alert("sorry, the product is out of stock");
        return;
      }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity},
    });
    navigate('/cart');
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : isError ? (
        <MessageBox variant="danger">{isError}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={5} className="d-flex justify-content-end">
              <img
                className="product_image my-2 rounded"
                src={product.image}
                alt={product.name}
              ></img>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    rating={product.rating}
                    numReview={product.numReview}
                  />
                </ListGroupItem>
                <ListGroupItem>price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: <p>{product.description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className="my-4">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success"> In stock</Badge>
                          ) : (
                            <Badge bg="danger">Unvailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
