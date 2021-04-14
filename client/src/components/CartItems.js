import { ListGroup, Image, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cart";
import { useDispatch } from "react-redux";
const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const removeFromHandler = () => {
    dispatch(removeFromCart(item.product));
  };
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item.slug}`}>{item.name}</Link>
        </Col>
        <Col md={2}>{item.price}</Col>
        <Col md={2}>
          <Form.Control
            as="select"
            value={item.qty}
            onChange={
              (e) =>
                dispatch(addToCart(item.slug, Number(e.target.value), history))
              //   console.log(e.target.value)
            }
          >
            {[...new Array(item.countInStock)].map((el, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={removeFromHandler}>
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItems;
