// FeedbackForm.js
import React, { useState } from "react";

const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      onSubmit(feedback);
      setFeedback(""); // Clear the textarea after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
        rows="5"
        cols="40"
      />
      <br />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
