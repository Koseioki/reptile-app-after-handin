// PartnersPage.jsx
import { useEffect, useState } from "react";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    async function getPartners() {
      const url =
        "https://reptile-app-ebad6-default-rtdb.firebaseio.com/partners.json";
      const response = await fetch(url);
      const data = await response.json();
      const partnersArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setPartners(partnersArray);
    }
    getPartners();
  }, []);

  return (
    <div className="vets-page">
      <h1>Our Trusted Partners</h1>
      <div className="vets-list">
        {partners.map((partner) => (
          <div key={partner.id} className="vet-card">
            <img
              src={partner.image}
              alt={partner.name}
              className="vet-image"
            />
            <h2>{partner.name}</h2>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-website"
            >
              Visit Website
            </a>
            <p>{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
