function RestaurantItem({
  r,
  fetchReviews,
  deleteRestaurant,
  updateRestaurant,
  reviews
}) {
  return (
    <div>
      <h3>{r.name}</h3>
      <p>{r.city}</p>
      <p>Vegan Level: {r.veganLevel}</p>
      <p>RATE: {r.rating}</p>

      <a href={r.googleMapsUrl} target="_blank" rel="noreferrer">
        View on Maps
      </a>

      <button onClick={() => fetchReviews(r._id)}>
        Show Reviews
      </button>

      <button onClick={() => deleteRestaurant(r._id)}>
        Delete
      </button>

      <button onClick={() => updateRestaurant(r._id)}>
        Update
      </button>

      {reviews[r._id] && reviews[r._id].map(review => (
        <div key={review._id} style={{ marginLeft: '20px' }}>
          <p><strong>{review.name}</strong>: {review.comment}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantItem;