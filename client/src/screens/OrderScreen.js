import { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/order";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../types";
const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { isLoading, error, order } = useSelector(
    (state) => state.orderDetails
  );
  const { isLoading: isLoadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const { isLoading: isLoadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const { userInfo } = useSelector((state) => state.userData);
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";

      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    if (!userInfo) {
      history.push("/login");
    }

    // eslint-disable-next-line
  }, [
    dispatch,
    getOrderDetails,
    match,
    order,
    orderId,
    successPay,
    userInfo,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHanlder = () => {
    dispatch(deliverOrder(orderId));
  };
  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  return (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name : </strong> {order?.user?.name}
              </p>{" "}
              <p>
                <strong>Email : </strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress?.address},{order?.shippingAddress?.city}
                , {order?.shippingAddress?.postalCode},
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>{" "}
                {order?.paymentMethod && order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>You didnt place an order</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((el, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={el.image} alt={el.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${el.product}`}>{el.name}</Link>
                        </Col>
                        <Col md={4}>
                          {el.qty} * ${el.price} = ${el.qty * el.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {isLoadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {isLoadingDeliver && <Loader />}
              {userInfo &&
                userInfo?.user?.isAdmin &&
                order?.isPaid &&
                !order?.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHanlder}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
