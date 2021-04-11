import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Image } from "react-bootstrap";
import products from "../products";
import { showRating } from "../utils/functionsReact";

const ProductScreen = ({ match }) => {
  const productId = match.params.id;
  const product = products.find((el) => el._id === productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{showRating(product.rating)}</ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>Desc : ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>status :</Col>
                  <Col>
                    <strong>
                      {!product.countInStock ? "Out of Stock" : "In Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!product.countInStock}
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
