import RestaurantItem from './RestaurantItem';

function RestaurantList({
  restaurants,
  fetchReviews,
  deleteRestaurant,
  updateRestaurant,
  reviews
}) {
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