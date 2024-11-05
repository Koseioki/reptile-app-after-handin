// FeedbackForm.js
import React, { useState } from "react";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      try {
        const feedbackData = {
          feedback: feedback.trim(),
          userId: user ? user.uid : "Anonymous",
          createdAt: new Date().toISOString(),
        };

        // Send the feedback to Firebase
        const response = await fetch(
          "https://reptile-app-ebad6-default-rtdb.firebaseio.com/feedbacks.json",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedbackData),
          }
        );

        if (response.ok) {
          setFeedback(""); // Clear the textarea after successful submission
          setMessage("Thank you for your feedback!");
        } else {
          setMessage("Failed to submit feedback. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        setMessage("An error occurred. Please try again.");
      }
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
      {message && <p>{message}</p>}
    </form>
  );
};

export default FeedbackForm;
