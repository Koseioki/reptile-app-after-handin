// InfoPage.js
import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import { auth } from "../firebase-config";


const InfoPage = () => {
  return (
    <section className="page" id="info-page">
      <h1>Useful Information</h1>
      {/* Include the FeedbackForm component */}
      <FeedbackForm />
    </section>
  );
};

export default InfoPage;
