import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/user";
import FormContainer from "../components/FormContainer";
const RegisterScreen = ({ location, history }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);

  const { email, password, confirmPassword, name } = registerData;

  const dispatch = useDispatch();
  const { isLoading, error, userInfo } = useSelector((state) => state.userData);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
    if (password !== confirmPassword) {
      setMessage("Passwords do not match ");
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
