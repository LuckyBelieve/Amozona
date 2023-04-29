import { data } from "../data";
import { Link } from "react-router-dom";

const HomeScreen = () => {
    return (
        <div>
            <h1>featured Products</h1>
        <div className="products">
        {data.products.map(product=>(
          <div className="product-card" key={product.slug}>
            <div className="product-image">
            <Link to={`/product/${product.slug}`}>
                <img className="image" src={product.image} alt={product.name}/>
            </Link>
            </div>
            <div className="product-info">
            <Link to={`/product/${product.slug}`}>
                <p className="productName">{product.name}</p>
            </Link>
            <p><strong>${product.price}</strong></p>
            <button>Add to cart</button>
            </div>
          </div>
        ))}
        </div>
        </div>
    );
}
 
export default HomeScreen;