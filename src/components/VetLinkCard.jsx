// VetLinkCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VetLinkCard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/vets");
  }

  return (
    <div className="vet-link-card" onClick={handleClick}>
      <h2>VETS</h2>
      <p>Find reliable nearby vets for your reptile friends.</p>
    </div>
  );
}