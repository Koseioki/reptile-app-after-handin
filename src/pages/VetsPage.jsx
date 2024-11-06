// VetsPage.jsx
import { useEffect, useState } from "react";

export default function VetsPage() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    async function getVets() {
      const url = "https://your-api-endpoint/vets.json"; // to be replaced
      const response = await fetch(url);
      const data = await response.json();
      setVets(data);
    }
    getVets();
  }, []);

  return (
    <div className="vets-page">
      <h1>Reliable Nearby Vets</h1>
      <ul>
        {vets.map((vet, index) => (
          <li key={index}>
            <h2>{vet.name}</h2>
            <p>{vet.address}</p>
            <p>{vet.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}