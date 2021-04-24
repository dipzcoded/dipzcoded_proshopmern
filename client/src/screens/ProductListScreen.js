import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  loadProducts,
  deleteProductByID,
  createProduct,
} from "../actions/products";
import { PRODUCT_DELETE_RESET } from "../types";
import { PRODUCT_CREATE_RESET } from "../types";
const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector(
    (state) => state.productList
  );
  const {
    success: deleteSuccess,
    isLoading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.productDelete);
  const {
    success: successCreate,
    product: productCreate,
    isLoading: loadingCreate,
    error: errorCreate,
  } = useSelector((state) => state.productCreate);
  const { userInfo } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_DELETE_RESET });
    if (userInfo && userInfo?.user?.isAdmin) {
      if (successCreate) {
        history.push(`/admin/product/${productCreate?._id}/edit`);
      } else {
        dispatch(loadProducts());
      }
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    userInfo,
    history,
    deleteSuccess,
    successCreate,
    productCreate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      //   delete products
      dispatch(deleteProductByID(id));
    }
  };

  const createProductHandler = (e) => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?._id}>
                <td>{product?._id}</td>
                <td>{product?.name}</td>
                <td>${product?.price}</td>
                <td>{product?.category}</td>
                <td>{product?.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product?._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
