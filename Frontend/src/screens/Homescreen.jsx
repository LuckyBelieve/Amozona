import { useEffect, useReducer } from "react";
import axios from 'axios'
import { Col, Row } from "react-bootstrap";
import { reducer } from "../reducer/reducer";
import { burl } from "../utils/url";
import Product from "../components/product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";

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
            <Helmet>
                
                <title>amazona</title>
            </Helmet>
            <h1>featured Products</h1>
            {loading && <LoadingBox/>}
            {isError && <MessageBox variant="danger">{isError}</MessageBox>}
        <div className="products">
        <Row>
            { products && products.map(product=>(
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}/>
                </Col>
            ))}
        </Row>
        </div>
        </div>
    );
}
 
export default HomeScreen;