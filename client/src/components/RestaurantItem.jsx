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

      <button onClick={() => {
        const name = prompt("Your name");
        const comment = prompt("Your review");
        const rating = prompt("Rating (1-5)");
        const email = prompt("Enter your email");

        if (!name || !comment || !rating || !email) {
          alert("All fields are required");
          return;
        }

        fetch('http://localhost:3000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            comment,
            rating: Number(rating),
            restaurantId: r._id,
            email
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              alert(data.error);
            } else {
              fetchReviews(r._id);
            }
          })
          .catch(err => console.error(err));

      }}>
        Add Review
      </button>

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