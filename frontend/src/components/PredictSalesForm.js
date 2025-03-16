import React, { useState } from 'react';
import './PredictSalesForm.css';

const PredictSalesForm = () => {
  const [formData, setFormData] = useState({
    day_of_week: 6,
    season: "Winter",
    weather: "Sunny",
    is_holiday: 0,
    hour: 9,
    month: 1,
    item_type: "Beverage",
    discount: 30,
  });

  const [predictedSales, setPredictedSales] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'discount' || name === 'hour' || name === 'month' || name === 'day_of_week' 
        ? parseInt(value, 10) 
        : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict_sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPredictedSales(data.predicted_sales);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPredictedSales("An error occurred while fetching the prediction.");
    }
  };

  return (
    <>
    <h5>Predict Sales </h5>
    <div className="predict-sales-form">
      
      <form onSubmit={handleSubmit}>
        <label>
          Day of Week:
          <select name="day_of_week" value={formData.day_of_week} onChange={handleChange}>
            {[...Array(7).keys()].map((day) => (
              <option key={day} value={day + 1}>{day + 1}</option>
            ))}
          </select>
        </label>

        <label>
          Season:
          <select name="season" value={formData.season} onChange={handleChange}>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </label>

        <label>
          Weather:
          <select name="weather" value={formData.weather} onChange={handleChange}>
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Snowy">Snowy</option>
          </select>
        </label>

        <label>
          Is Holiday:
          <select name="is_holiday" value={formData.is_holiday} onChange={handleChange}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </label>

        <label>
          Hour (0-24):
          <input
            type="number"
            name="hour"
            value={formData.hour}
            min="0"
            max="24"
            onChange={handleChange}
          />
        </label>

        <label>
          Month (1-12):
          <input
            type="number"
            name="month"
            value={formData.month}
            min="1"
            max="12"
            onChange={handleChange}
          />
        </label>

        <label>
          Item Type:
          <select name="item_type" value={formData.item_type} onChange={handleChange}>
            <option value="Beverage">Beverage</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>

        <label>
          Discount (%):
          <input
            type="number"
            name="discount"
            value={formData.discount}
            min="0"
            max="100"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Predict Sales</button>
      </form>

      {predictedSales !== null && (
        <div className="prediction-result">
          <h3>Predicted Sales:</h3>
          <p>{typeof predictedSales === 'number' ? predictedSales.toFixed(2) : predictedSales}</p>
        </div>
      )}
    </div>

    </>
  );
};

export default PredictSalesForm;
