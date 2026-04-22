import { useEffect, useState } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [veganLevel, setVeganLevel] = useState('');
  const [rating, setRating] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

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
        </div>
      ))}
    </div>
  );
}

export default App;