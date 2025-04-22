import { useState, useEffect } from "react";
import "./Vans.css";

export default function Vans() {
  const [vans, setVans] = useState([]);
  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const vanElements = vans.map(({ id, imageUrl, name, price, type }) => (
    <div key={id} className="van-tile">
      <img src={imageUrl} alt={`${name} Image`} loading="lazy" />
      <div className="van-info">
        <h3>{name}</h3>
        <p>
          ${price}
          <span>/day</span>
        </p>
      </div>
      <i className={`van-type ${type} selected`}>{type}</i>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
