// Vans.jsx

import {
  Await,
  defer,
  Link,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import "./Vans.css";
import { getVans } from "../../api";
import { Suspense } from "react";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataPromise = useLoaderData();

  const typeFilter = searchParams.get("type");

  function renderVanElements(vans) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    const vanElements = Array.isArray(displayedVans)
      ? displayedVans.map(({ id, imageUrl, name, price, type }) => (
          <div key={id} className="van-tile">
            <Link
              to={id}
              state={{
                search: `?${searchParams.toString()}`,
                type: typeFilter,
              }}
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
        ))
      : null;
    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => setSearchParams({ type: "simple" })}
            className={`van-type simple ${
              typeFilter === "simple" && "selected"
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setSearchParams({ type: "luxury" })}
            className={`van-type luxury ${
              typeFilter === "luxury" && "selected"
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => setSearchParams({ type: "rugged" })}
            className={`van-type rugged ${
              typeFilter === "rugged" && "selected"
            }`}
          >
            Rugged
          </button>
          {typeFilter ? (
            <button
              onClick={() => setSearchParams({})}
              className="van-type clear-filters"
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
