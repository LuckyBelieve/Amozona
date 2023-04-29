import { useEffect, useReducer } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { burl } from "../utils/url";
import { reducer } from "../reducer/reducer";

const HomeScreen = () => {
    const [{loading,isError,products},dispatch] = useReducer(reducer,{
        products:[],
        loading:true,
        isError:''
    })
    useEffect(()=>{
       const fetchData = async ()=>{
        dispatch({type:"FETCH_REQUEST"});
        try {
            const results = await axios.get(burl+ "/api/products");
            dispatch({type:"FETCH_SUCCESS",payload:results.data});
        } catch (err) {
            dispatch({type:"FETCH_FAIL",payload:err.message})
        }
       }
       fetchData()
    },[]);
    return (
        <div>
            <h1>featured Products</h1>
            {loading&& <div>loading...</div>}
            {isError && <div>{isError}</div>}
        <div className="products">
        {products.map(product=>(
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