import React, { useEffect, useState } from 'react';
import './MenuComponent.css';

const MenuComponent = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // Fetch data from API endpoint
    fetch('http://127.0.0.1:5000/predict_menu') // Replace with your actual endpoint
      .then(response => response.json())
      .then(data =>
        {
          setMenuData(data.Menu);
          console.log(data);
        } )
      .catch(error => console.error("Error fetching menu data:", error));
  }, []);

  return (
    <div className="menu-container">
      <h1 className="main-heading">Our Menu</h1>

      {/* Render all menu sections */}
      {menuData.map((section, index) => {
        // Get the category name (e.g., "Rotis" or "Cool Drinks")
        const category = Object.keys(section)[0];
        const items = section[category];

        return (
          <div key={index} className="menu-section">
            <h2 className="section-heading">{category}</h2>
            <div className="item-cards">
              {items.map((item, idx) => (
                <div key={idx} className="item-card">
                  <h3>{item["Item Name"]}</h3>
                  <p>Cost per Item: ${item["Cost per Item"]}</p>
                  <p>Price per Item: ${item["Price per Item"]}</p>
                  <p>Orders: {item.Orders}</p>
                  <p>Total Profit: ${item["Total Profit"].toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuComponent;
