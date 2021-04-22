import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserById } from "../actions/user";
import { USER_UPDATE_RESET } from "../types";
import FormContainer from "../components/FormContainer";
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const { email, name } = userData;

  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state) => state.userData);
  const { isLoading: userLoading, user, error: userError } = useSelector(
    (state) => state.userDetails
  );
  const {
    isLoading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user || user?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setUserData({
          name: user?.name,
          email: user?.email,
        });
        setIsAdmin(user?.isAdmin);
      }
    }
  }, [history, userInfo, dispatch, user, successUpdate, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserById(userId, { ...userData, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {userLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{userError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
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
                  setUserData({
                    ...userData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
