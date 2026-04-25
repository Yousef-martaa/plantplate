function RestaurantItem({
  r,
  fetchReviews,
  deleteRestaurant,
  updateRestaurant,
  reviews
}) {
  return (
    <article className="restaurant-card">
      <h3>{r.name}</h3>

      <p><strong>City:</strong> {r.city}</p>
      <p><strong>Vegan Level:</strong> {r.veganLevel}</p>
      <p><strong>Rating:</strong> {r.rating}/5</p>

      <div className="restaurant-actions">
        <a className="map-link" href={r.googleMapsUrl} target="_blank" rel="noreferrer">
          View on Maps
        </a>

        <button onClick={() => fetchReviews(r._id)}>Show Reviews</button>
        <button onClick={() => updateRestaurant(r._id)}>Update</button>
        <button onClick={() => deleteRestaurant(r._id)}>Delete</button>
      </div>

      {reviews[r._id] && reviews[r._id].map(review => (
        <div key={review._id} className="review-box">
          <p><strong>{review.name}</strong>: {review.comment}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))}
    </article>
  );
}

export default RestaurantItem;