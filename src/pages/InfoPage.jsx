//Consuelo and Connor
import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import StepByStepGuideCard from "../components/StepByStepGuideCard";
import PartnersCard from "../components/PartnersCard";
import VetLinkCard from "../components/VetLinkCard";
import { auth } from "../firebase-config";

const InfoPage = () => {
  return (
    <section className="page" id="info-page">
      <h1>Useful Information</h1>
      <StepByStepGuideCard />
      <VetLinkCard />
      <PartnersCard />
      {/* Include the FeedbackForm component */}
      <FeedbackForm />
    </section>
  );
};

export default InfoPage;
