import { useEffect, useState } from 'react';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import logo from './assets/logo.png';
import UserForm from './components/UserForm';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [veganLevel, setVeganLevel] = useState('');
  const [rating, setRating] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const [reviews, setReviews] = useState({});

  const [error, setError] = useState('');

  const [minRating, setMinRating] = useState('');

  const fetchRestaurants = () => {
    const url = minRating
      ? `http://localhost:3000/api/restaurants?minRating=${minRating}`
      : `http://localhost:3000/api/restaurants`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load restaurants');
      });
  };

  useEffect(() => {
    fetchRestaurants();
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

    if (res.ok) {
      setRestaurants([...restaurants, data]);

      setName('');
      setCity('');
      setVeganLevel('');
      setRating('');
      setGoogleMapsUrl('');
    } else {
      alert(data.error);
    }
  };

  const fetchReviews = async (restaurantId) => {

    if (reviews[restaurantId]) {
      setReviews(prev => {
        const updated = { ...prev };
        delete updated[restaurantId];
        return updated;
      });
      return;
    }

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
    <div className="app">

      {/* logo */}
      <header className="navbar">
        <div className="brand">
          <img src={logo} alt="Vägen till Vegan logo" className="brand-logo" />
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Leave the meat. Meet the leaves</h1>
          <p>
            Discover vegan, vegetarian, and plant-friendly restaurants near you.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="container">

        {error && <p className="error">{error}</p>}
        {loading && !error && <p className="loading">Loading...</p>}

        <UserForm />

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

        <div className="filter-section">
          <label>Filter by minimum rating (1–5)</label>

          <div className="filter-row">
            <input
              type="number"
              min="1"
              max="5"
              placeholder="1–5"
              value={minRating}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (value >= 1 && value <= 5)) {
                  setMinRating(value);
                }
              }}
            />

            <button onClick={fetchRestaurants}>
              Apply
            </button>
          </div>
        </div>


        <div className="top-section">


          <button className="top-btn" onClick={() => {
            fetch('http://localhost:3000/api/restaurants/top?limit=3')
            .then(res => res.json())
            .then(data => setRestaurants(data));
          }}>
            Show Top 3 Restaurants
          </button>

        </div>

        <RestaurantList
          restaurants={restaurants}
          fetchReviews={fetchReviews}
          deleteRestaurant={deleteRestaurant}
          updateRestaurant={updateRestaurant}
          reviews={reviews}
        />

      </main>
    </div>
  );
}

export default App;