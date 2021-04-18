import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cart";
import CheckOut from "../components/CheckOut";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cartList);
  const [shippingDetails, setShippingDetails] = useState({
    address:
      shippingAddress && shippingAddress.address
        ? shippingAddress?.address
        : "",
    city: shippingAddress && shippingAddress.city ? shippingAddress?.city : "",
    postalCode:
      shippingAddress && shippingAddress.postalCode
        ? shippingAddress?.postalCode
        : "",
    country:
      shippingAddress && shippingAddress.country
        ? shippingAddress?.country
        : "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingDetails));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckOut step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter Address"
            value={shippingDetails.address}
            required
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Enter City"
            value={shippingDetails.city}
            required
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            placeholder="Enter PostalCode"
            value={shippingDetails.postalCode}
            required
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Enter Country"
            value={shippingDetails.country}
            required
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                [e.target.name]: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={
            shippingDetails.address === "" ||
            shippingDetails.city === "" ||
            shippingDetails.country === "" ||
            shippingDetails.postalCode === ""
          }
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
