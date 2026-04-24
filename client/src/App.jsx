import { useEffect, useState } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [veganLevel, setVeganLevel] = useState('');
  const [rating, setRating] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const [reviews, setReviews] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
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
      headers: {
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Content-Type': 'application/json'
      },
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

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      <form onSubmit={addRestaurant}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/*  Dropdown */}
        <select value={veganLevel} onChange={(e) => setVeganLevel(e.target.value)}>
          <option value="">Select Vegan Level</option>
          <option value="Fully Vegan">Fully Vegan</option>
          <option value="Vegan Friendly">Vegan Friendly</option>
          <option value="Has Options">Has Options</option>
        </select>

        <input
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          placeholder="Google Maps URL"
          value={googleMapsUrl}
          onChange={(e) => setGoogleMapsUrl(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {restaurants.map(r => (
        <div key={r._id}>
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
      ))}
    </div>
  );
}

export default App;