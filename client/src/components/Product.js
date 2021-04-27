import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { showRating } from "../utils/functionsReact";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${product.slug}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {showRating(product.rating, product.numReviews)}
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
