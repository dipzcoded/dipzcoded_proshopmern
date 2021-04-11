import StarRatings from "react-star-ratings";
export const showRating = (rating) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      numberOfStars={5}
      starDimension="18px"
      starSpacing="1px"
    />
    <p style={{ display: "inline-block" }}>
      {rating} {rating === 1 ? "review" : "reviews"}
    </p>
  </div>
);
