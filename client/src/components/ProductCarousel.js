import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { loadTopProducts } from "../actions/products";
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(loadTopProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
    <Carousel pause="hover" className="bg-dark">
      {products?.map((el) => (
        <Carousel.Item key={el._id}>
          <Link to={`/product/${el?._id}`}>
            <Image src={el?.image} alt={el?.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {el?.name} (${el?.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
