import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Image,
  Form,
} from "react-bootstrap";
import { showRating } from "../utils/functionsReact";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../actions/products";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(
    (state) => state.productList
  );

  const productId = match.params.id;
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [match, dispatch]);
  const addToCartHandler = (e) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{showRating(product?.rating)}</ListGroup.Item>
            <ListGroup.Item>Price : ${product?.price}</ListGroup.Item>
            <ListGroup.Item>Desc : ${product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>status :</Col>
                  <Col>
                    <strong>
                      {!product?.countInStock ? "Out of Stock" : "In Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...new Array(product.countInStock)].map(
                          (el, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={!product?.countInStock}
                  disabled={qty === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
