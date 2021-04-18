import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/user";
const ProfileScreen = ({ location, history }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userData);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!user && !isLoading) {
      dispatch(getUserDetails("profile"));
    }

    setUserDetails({
      ...userDetails,
      name: user && user.name ? user.name : "",
      email: user && user.email ? user.email : "",
    });
  }, [location, history, user, userInfo, dispatch, userUpdateProfile]);

  useEffect(() => {
    if (userUpdateProfile && userUpdateProfile.userInfo) {
      setUserDetails({
        ...userDetails,
        name: userUpdateProfile?.userInfo?.user?.name
          ? userUpdateProfile?.userInfo?.user?.name
          : "",
        email: userUpdateProfile?.userInfo?.user?.email
          ? userUpdateProfile?.userInfo?.user?.email
          : "",
      });
    }
  }, [userUpdateProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
    if (userDetails.password !== userDetails.confirmPassword) {
      setMessage("Passwords do not match ");
    } else {
      dispatch(
        updateUserDetails(
          {
            id: user.id,
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
          },
          history
        )
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {userUpdateProfile.success && (
          <Message variant="success">Profile Updated</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
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
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
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
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
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
              value={userDetails.confirmPassword}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>my orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
