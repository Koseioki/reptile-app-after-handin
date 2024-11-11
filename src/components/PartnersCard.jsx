import { useNavigate } from "react-router-dom";

//Consuelo
export default function PartnersCard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/partners");
  }

  return (
    <div className="post-card" onClick={handleClick}>
      <h2>Partners</h2>
      <p>
        We collaborate with partners that we trust and are verified to guarantee
        you the best experience.
      </p>
    </div>
  );
}
