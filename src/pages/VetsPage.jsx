// VetsPage.jsx
import { useEffect, useState } from "react";


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
      <ul>
        {vets.map((vet) => (
          <li key={vet.id}>
            <h2>{vet.name}</h2>
            <p>{vet.location}</p>
            <p>{vet.specialisation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}