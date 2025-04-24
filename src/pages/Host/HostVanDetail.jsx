// HostVanDetail.jsx;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));
  }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <img src={currentVan.imageUrl} alt={`Photo of ${currentVan.name}`} />
      <h2>{currentVan.name}</h2>
      <p>{currentVan.price}</p>
      <p>{currentVan.type}</p>
    </>
  );
}
