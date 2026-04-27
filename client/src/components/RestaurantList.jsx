import RestaurantItem from './RestaurantItem';

function RestaurantList({
  restaurants,
  fetchReviews,
  deleteRestaurant,
  updateRestaurant,
  reviews,
  loading,
  error
}) {
  // show loading state
if (loading) {
  return <p className="loading">Loading restaurants...</p>;
}

// show error state
if (error) {
  return <p className="error">{error}</p>;
}

// show empty state
if (restaurants.length === 0) {
  return <p>No restaurants found.</p>;
}
  return (
    <section className="restaurants-section">
      <div className="section-header">
        <h2>Plant-friendly restaurants</h2>
        <p>Find vegan, vegetarian, and vegan-friendly places in Sweden.</p>
      </div>

      <div className="restaurant-grid">
        {restaurants.map(r => (
          <RestaurantItem
            key={r._id}
            r={r}
            fetchReviews={fetchReviews}
            deleteRestaurant={deleteRestaurant}
            updateRestaurant={updateRestaurant}
            reviews={reviews}
          />
        ))}
      </div>
    </section>
  );
}

export default RestaurantList;