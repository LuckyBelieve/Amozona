import { Alert } from "react-bootstrap";

export default function MessageBox(props){
    return (
        <Alert className="mt-2" variant={props.variant || "info"}>{props.children}</Alert>
    )
}