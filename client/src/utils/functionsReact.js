import StarRatings from "react-star-ratings";
export const showRating = (rating, numRating) => (
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
      starDimension="16px"
      starSpacing="1px"
    />
    {numRating && (
      <p style={{ display: "inline-block", marginTop: "2.8px" }}>
        {numRating} {rating === 1 ? "review" : "reviews"}
      </p>
    )}
  </div>
);
