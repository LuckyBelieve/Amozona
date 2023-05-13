import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../store";

const Product = (props) => {
    const {product} = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const addToCartHandler = () => {
      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity: 1 },
      });
    };
    return (  
        <Card>
            <div className="product-image">
                <Link to={`/product/${product.slug}`}>
                    <img className="image" src={product.image} alt={product.name}/>
                </Link> 
            </div>
            <Card.Body>
                <Link to={`/product/${product.slug}`} className="text-decoration-none">
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReview={product.numReview} />
                <Card.Text>${product.price}</Card.Text>
                <Button onClick={addToCartHandler}>Add to cart</Button>
            </Card.Body>
        </Card>
    );
}
 
export default Product;