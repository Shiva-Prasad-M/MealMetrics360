import React, { useState } from 'react';
import './RecommendItems.css';

const RecommendItems = () => {
  const [customerId, setCustomerId] = useState('');
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined items with their image URLs
  const itemImages = {
    Biryani: "https://tse1.mm.bing.net/th?id=OIP.DRUkAwNCe3KCoYSbVDWwKQHaD7&pid=Api&P=0&h=180",
    CocaCola: "https://tse3.mm.bing.net/th?id=OIP.fDcN6jdtxo-Cetw68fPopQHaHa&pid=Api&P=0&h=180",
    Pasta: "https://tse4.mm.bing.net/th?id=OIP.3qiOYdcpu2jl8G9ln1phLgHaE8&pid=Api&P=0&h=180",
    JulabGamun: "https://tse3.mm.bing.net/th?id=OIP.M55_wi38w_K9QMI1yk3VxAHaFj&pid=Api&P=0&h=180",
    Cake: "https://tse1.mm.bing.net/th?id=OIP.dRfSglXCPSi8dbC5OLjM4wHaE8&pid=Api&P=0&h=180"
  };

  const handleSubmit = async (e) => {
    console.log("handle submit is going on ");
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate customerId before submitting
    if (!customerId || isNaN(customerId)) {
      setError("Please enter a valid Customer ID.");
      setLoading(false);
      return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/recommend/${customerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        

      if (!response.ok) {
         console.log("response is not ok");
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log(data);
      setRecommendedItems(data.recommended_items);
      console.log(data.recommended_items);
    } catch (err) {
        console.log("catching ")
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h1>Recommended Items for Customer</h1>

      {/* Input Form */}
      <form className="prediction-form" onSubmit={handleSubmit}>
        <label htmlFor="customer-id">Customer ID:</label>
        <input
          type="text"
          id="customer-id"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Recommended Items */}
      <div className="recommended-items">
        {loading ? (
          <p>Loading recommendations...</p>
        ) : recommendedItems.length > 0 ? (
          recommendedItems.map((item, index) => (
            itemImages[item] ? (
              <div key={index} className="item-card">
                <img src={itemImages[item]} alt={item} className="item-image" />
                <p>{item}</p>
              </div>
            ) : null
          ))
        ) : (
          <p>No recommendations yet. Submit a valid Customer ID.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendItems;
