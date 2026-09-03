import { useEffect, useState } from "react";
import TrainerCard from "../components/TrainerCard";

export default function ClassesPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Task 4 was partially implemented in the exam:
  // API fetch + loading/error + TrainerCard rendering.
  // Search/filter was not added here.
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/trainers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trainers");
        return res.json();
      })
      .then((data) => setTrainers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading trainers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>FitZone Classes</h1>
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer._id}
          name={trainer.name}
          specialization={trainer.specialization}
          available={trainer.available}
        />
      ))}

      <h2>Book a Class</h2>
      <form>
        <label>Trainer</label>
        <input placeholder="Trainer ID" />
        <label>Class Name</label>
        <input placeholder="Class name" />
        <label>Date</label>
        <input type="date" />
        <label>Time Slot</label>
        <input placeholder="10:00 AM - 11:00 AM" />
        <button type="button">Book</button>
      </form>
    </div>
  );
}
