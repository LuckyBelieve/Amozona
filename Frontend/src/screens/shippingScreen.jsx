import { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart:{
    shippingAddress
  }} = state;
  const [fullname, setFullname] = useState(shippingAddress.fullname || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(()=>{
    if(!userInfo){
        navigate("/signin?redirect=/shipping");
    }
  },[userInfo,navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullname,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullname,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3"> Shipping Address</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="fullname">
            <FormLabel>Fullname</FormLabel>
            <FormControl
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="address">
            <FormLabel>address</FormLabel>
            <FormControl
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="city">
            <FormLabel>city</FormLabel>
            <FormControl
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <FormControl
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="country">
            <FormLabel>Country</FormLabel>
            <FormControl
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </FormGroup>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingScreen;
