import { useEffect, useState } from "react";
import "./styles.css";
import dataService from "../../services/dataService";
import { formatDate } from "../../utils/formatDate";
import TestimonialCreate from "../testimonial-create/TestimonialCreate";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const data = await dataService.getAllDocuments("testimonials");
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-cards">
        {testimonials.length === 0 ? (
          <p>
            No testimonials available. Be the first to share your experience!
          </p>
        ) : (
          testimonials.slice(0, 10).map((testimonial) => (
            <div
              className="testimonial-card"
              key={testimonial.id}
            >
              <p>"{testimonial.text}"</p>
              <h3>- {testimonial.userName}</h3>
              <small>
                {formatDate(testimonial.createdAt, "DD/MM/YYYY HH:mm")}
              </small>
            </div>
          ))
        )}
      </div>
      <TestimonialCreate fetchTestimonials={fetchTestimonials} />
    </section>
  );
}
