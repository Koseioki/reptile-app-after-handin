import React from "react";
import { useNavigate } from "react-router-dom";

export default function VetLinkCard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/vets");
  }

  return (
    <div className="post-card" onClick={handleClick}>
      <h2>Verified Vets</h2>
      <p>Find reliable nearby vets for your reptile friends.</p>
    </div>
  );
}