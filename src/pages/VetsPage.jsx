// VetsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function VetsPage() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    async function getVets() {
      const url = "https://reptile-app-ebad6-default-rtdb.firebaseio.com/vets.json";
      const response = await fetch(url);
      const data = await response.json();
      const vetsArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setVets(vetsArray);
    }
    getVets();
  }, []);

  return (
    <div className="vets-page">
      <h1>Reliable Nearby Vets</h1>
      <div className="vets-list">
        {vets.map((vet) => (
          <div key={vet.id} className="vet-card">
            <img src={vet.image} alt={vet.name} className="vet-image" />
            <h2>{vet.name}</h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vet.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vet-location"
            >
              {vet.location}
            </a>
            <p>{vet.specialisation}</p>
            <Link to={`/vets/${vet.id}`} className="vet-details-link">
              More Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}