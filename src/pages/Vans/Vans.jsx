import { useState, useEffect } from "react";
import "./Vans.css";
import { Link, NavLink, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map(
    ({ id, imageUrl, name, price, type }) => (
      <div key={id} className="van-tile">
        <Link
          to={`/vans/${id}`}
          aria-label={`View details for ${name}, priced at $${price} per day`}
          title={`Click to view details for ${name}`}
        >
          <img src={imageUrl} alt={`${name} Image`} loading="lazy" />
          <div className="van-info">
            <h3>{name}</h3>
            <p>
              ${price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${type} selected`}>{type}</i>
        </Link>
      </div>
    )
  );

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className="van-type simple"
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className="van-type luxury"
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className="van-type rugged"
        >
          Rugged
        </button>
        <button
          onClick={() => setSearchParams({})}
          className="van-type clear-filters"
        >
          Clear filter
        </button>
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
