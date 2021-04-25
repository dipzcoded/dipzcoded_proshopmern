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
import { getProductByID, createProductReview } from "../actions/products";
import { PRODUCT_CREATE_REVIEW_RESET } from "../types";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const { rating, comment } = review;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(
    (state) => state.productList
  );

  const {
    success: reviewSuccess,
    isLoading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.productReviewCreate);
  const { userInfo } = useSelector((state) => state.userData);

  const productId = match.params.id;
  const alreadyReviewed = product?.reviews?.find(
    (el) => el?.user?.toString() === userInfo?.user?.id?.toString()
  );

  useEffect(() => {
    if (reviewSuccess) {
      alert("Review Submitted!");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setReview({
        rating: 0,
        comment: "",
      });
    }
    dispatch(getProductByID(productId));
  }, [match, dispatch, productId, reviewSuccess]);
  const addToCartHandler = (e) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
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
            <ListGroup.Item>
              {showRating(product?.rating, product?.numReviews)}
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product?.price}</ListGroup.Item>
            <ListGroup.Item>Desc : {product?.description}</ListGroup.Item>
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
                  disabled={!product?.countInStock || qty === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {!product?.reviews?.length && <Message>No Reviews</Message>}
          <ListGroup variant="flush">
            {product?.reviews?.map((review) => (
              <ListGroup.Item key={review?._id}>
                <strong>{review?.name}</strong>
                {showRating(review?.rating)}
                <p>{review?.createdAt.substring(0, 10)}</p>
                <p>{review?.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              {!userInfo ? (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              ) : (
                !alreadyReviewed && (
                  <>
                    <h2>Write a customer review</h2>
                    {reviewError && (
                      <Message variant="danger">{reviewError}</Message>
                    )}
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlid="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          type="number"
                          value={rating}
                          step={0.5}
                          max={5}
                          min={0}
                          name="rating"
                          placeholder="Enter a rating between 0 and 5"
                          onChange={(e) =>
                            setReview({
                              ...review,
                              [e.target.name]: e.target.valueAsNumber,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group controlid="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          value={comment}
                          name="comment"
                          placeholder="Enter a comment"
                          onChange={(e) =>
                            setReview({
                              ...review,
                              [e.target.name]: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  </>
                )
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
