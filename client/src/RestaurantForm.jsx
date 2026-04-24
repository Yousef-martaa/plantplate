function RestaurantForm({
  name, setName,
  city, setCity,
  veganLevel, setVeganLevel,
  rating, setRating,
  googleMapsUrl, setGoogleMapsUrl,
  onAdd
}) {
  return (
    <form onSubmit={onAdd}>
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
  );
}

export default RestaurantForm;