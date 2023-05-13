import {Button, Container,Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link,useLocation} from "react-router-dom";

const SignInScreen = () => {
    const {search} = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL?redirectURL:"/";
    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className=" my-3">sign In</h1>
            <Form>
                <FormGroup className="mb-3" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" required />
                </FormGroup>
                <FormGroup className="mb-3" controlId="email">
                <FormLabel>password</FormLabel>
                <FormControl type="password" required />
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit">sign In</Button>
                </div>
                <div className="mb-3">
                    new customer? {" "}
                    <Link to={`/signUp?redirect=${redirect}`}>create your account</Link>
                </div>
            </Form>
        </Container>
    );
}
 
export default SignInScreen;