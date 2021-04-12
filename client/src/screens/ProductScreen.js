import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Image } from "react-bootstrap";
import { showRating } from "../utils/functionsReact";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  const productId = match.params.id;
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match, productId]);

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
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!product?.countInStock}
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
