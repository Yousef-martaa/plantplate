import RestaurantItem from './RestaurantItem';

function RestaurantList({
  restaurants,
  fetchReviews,
  deleteRestaurant,
  updateRestaurant,
  reviews
}) {
  return (
    <div>
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
  );
}

export default RestaurantList;