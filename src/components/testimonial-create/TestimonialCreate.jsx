import "./styles.css";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import dataService from "../../services/dataService";
import generateId from "../../utils/generateId";
import { Timestamp } from "firebase/firestore";

export default function TestimonialCreate({ fetchTestimonials }) {
  const user = useAuth();
  const [testimonial, setTestimonial] = useState("");
  const [message, setMessage] = useState("");
  const userId = user?.user?.uid;
  const userName = user?.user?.displayName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testimonial.trim()) {
      setMessage("Please write something before submitting.");
      return;
    }

    await dataService.createDocument("testimonials", generateId(), {
      text: testimonial,
      userId,
      userName,
      createdAt: Timestamp.now(),
    });

    setMessage("Thank you for your feedback!");
    setTestimonial("");
    fetchTestimonials();
  };

  if (!userId) return null;

  return (
    <div className="leave-testimonial">
      <h2>Leave a Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          placeholder="Write your testimonial here..."
          rows="5"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
