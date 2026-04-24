import { useEffect, useState } from 'react';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [veganLevel, setVeganLevel] = useState('');
  const [rating, setRating] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const [reviews, setReviews] = useState({});

  const fetchRestaurants = () => {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRestaurants();

    const interval = setInterval(() => {
      fetchRestaurants();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addRestaurant = async (e) => {
    e.preventDefault();

    const newRestaurant = {
      name,
      city,
      veganLevel,
      rating: Number(rating),
      googleMapsUrl
    };

    const res = await fetch('http://localhost:3000/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRestaurant)
    });

    const data = await res.json();
    setRestaurants([...restaurants, data]);

    setName('');
    setCity('');
    setVeganLevel('');
    setRating('');
    setGoogleMapsUrl('');
  };

  const fetchReviews = async (restaurantId) => {
    if (reviews[restaurantId]) return;

    const res = await fetch(`http://localhost:3000/api/reviews?restaurantId=${restaurantId}`);
    const data = await res.json();

    setReviews(prev => ({
      ...prev,
      [restaurantId]: data
    }));
  };

  const deleteRestaurant = async (id) => {
    await fetch(`http://localhost:3000/api/restaurants/${id}`, {
      method: 'DELETE'
    });

    setRestaurants(restaurants.filter(r => r._id !== id));
  };

  const updateRestaurant = async (id) => {
    const newName = prompt("Enter new name");
    const newCity = prompt("Enter new city");
    const newVeganLevel = prompt("Enter vegan level");
    const newRating = prompt("Enter rating");
    const newUrl = prompt("Enter Google Maps URL");

    const updatedData = {
      name: newName,
      city: newCity,
      veganLevel: newVeganLevel,
      rating: Number(newRating),
      googleMapsUrl: newUrl
    };

    const res = await fetch(`http://localhost:3000/api/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    const updated = await res.json();

    setRestaurants(restaurants.map(r =>
      r._id === id ? updated : r
    ));
  };

  return (
    <div>
      <h1>PlantPlat - Vegan Restaurants Finder</h1>

      {loading && <p>Loading...</p>}

      <RestaurantForm
        name={name}
        setName={setName}
        city={city}
        setCity={setCity}
        veganLevel={veganLevel}
        setVeganLevel={setVeganLevel}
        rating={rating}
        setRating={setRating}
        googleMapsUrl={googleMapsUrl}
        setGoogleMapsUrl={setGoogleMapsUrl}
        onAdd={addRestaurant}
      />

      <RestaurantList
        restaurants={restaurants}
        fetchReviews={fetchReviews}
        deleteRestaurant={deleteRestaurant}
        updateRestaurant={updateRestaurant}
        reviews={reviews}
      />
    </div>
  );
}

export default App;