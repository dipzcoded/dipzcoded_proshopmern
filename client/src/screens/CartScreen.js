import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cart";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import CartItems from "../components/CartItems";
import Message from "../components/Message";
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const productQty = location.search
    ? Number(location.search.split("=")[1])
    : 1;
  const { cartItems } = useSelector((state) => state.cartList);
  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, productQty, history));
    }
  }, [dispatch, productId, productQty, history]);
  const onCheckOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((el) => (
              <CartItems key={el.product} item={el} />
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup.Item variant="flush">
            <h2>
              Subtotal ({cartItems?.reduce((prev, next) => prev + next.qty, 0)})
              items
            </h2>
            ${" "}
            {cartItems
              ?.reduce((prev, next) => prev + next.qty * next.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              className="btn btn-block"
              type="button"
              disabled={!cartItems.length}
              onClick={onCheckOutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
