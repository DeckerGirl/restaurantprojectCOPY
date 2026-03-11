import { useState, useEffect } from "react";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then(res => res.json())
      .then(data => setMenuItems(data));
  }, []);

  return (
    <div>
      <h1>Our Menu</h1>
      {menuItems.map(item => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
