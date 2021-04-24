import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProductByID, updateProductByID } from "../actions/products";
import { PRODUCT_UPDATE_RESET } from "../types";
import FormContainer from "../components/FormContainer";
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    countInStock: 0,
    category: "",
    description: "",
  });
  const {
    name,
    price,
    image,
    brand,
    countInStock,
    category,
    description,
  } = productData;

  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state) => state.userData);
  const {
    product,
    isLoading: productLoading,
    error: productError,
  } = useSelector((state) => state.productList);
  const {
    isLoading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.productUpdate);
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || product?.slug !== productId) {
        dispatch(getProductByID(productId));
      } else {
        setProductData({
          name: product?.name,
          price: product?.price,
          image: product?.image,
          brand: product?.brand,
          countInStock: product?.countInStock,
          category: product?.category,
          description: product?.description,
        });
      }
    }
  }, [
    history,
    userInfo,
    dispatch,
    product,
    setProductData,
    productId,
    updateSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    // product update
    dispatch(
      updateProductByID({
        _id: product?._id,
        name,
        price,
        brand,
        description,
        category,
        countInStock,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {productLoading ? (
          <Loader />
        ) : productError ? (
          <Message variant="danger">{productError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name="brand"
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                name="countInStock"
                type="number"
                placeholder="Enter CountInStock"
                value={countInStock}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    [e.target.name]: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
