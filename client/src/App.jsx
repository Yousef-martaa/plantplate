import { useEffect, useState } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error(err));
  }, []);

  const addRestaurant = async (e) => {
    e.preventDefault();

    const newRestaurant = {
      name,
      city,
      rating,
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
    setRating('');
    setGoogleMapsUrl('');
  };

  return (
    <div>
      <h1>PlantPlat - Vegans Restaurants Finder</h1>

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

        <input
          placeholder="Rating"
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
          <p>RATE: {r.rating}</p>
          <p>{r.googleMapsUrl}</p>
        </div>
      ))}
    </div>
  );
}

export default App;