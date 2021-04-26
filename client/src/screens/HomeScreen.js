import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../actions/products";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pagenumber || 1;
  const dispatch = useDispatch();
  const { products, isLoading, error, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(loadProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products?.map((el) => (
          <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={el} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default HomeScreen;
