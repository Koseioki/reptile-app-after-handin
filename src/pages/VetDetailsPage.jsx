// VetDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function VetDetailsPage() {
  const { vetId } = useParams();
  const [vet, setVet] = useState(null);

  useEffect(() => {
    async function getVet() {
      const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/vets/${vetId}.json`;
      const response = await fetch(url);
      const data = await response.json();
      setVet(data);
    }
    getVet();
  }, [vetId]);

  if (!vet) {
    return <div>Loading...</div>;
  }

  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="vet-details-page">
      <h1>{vet.name}</h1>
      <img src={vet.image} alt={vet.name} className="vet-image" />
      <div className="vet-details-section">
        <p><strong>Location:</strong> {vet.location}</p>
      </div>
      <hr />
      <div className="vet-details-section">
        <p><strong>Specialisation:</strong> {vet.specialisation}</p>
      </div>
      <hr />
      <div className="vet-details-section">
        <p><strong>Description:</strong> {vet.description}</p>
      </div>
      <hr />
      <div className="vet-details-section">
        <p><strong>Hours:</strong></p>
        <ul>
          {daysOrder.map((day) => (
            <li key={day}>
              <strong>{day}:</strong> {vet.hours[day]}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="vet-details-section">
        <p><strong>Contact:</strong></p>
        <p>Email: <a href={`mailto:${vet.contact.email}`}>{vet.contact.email}</a></p>
        <p>Phone: <a href={`tel:${vet.contact.phone}`}>{vet.contact.phone}</a></p>
      </div>
    </div>
  );
}