export default function TrainerCard({ name, specialization, available }) {
  const status = { true: "Available", false: "Fully Booked" }[available];

  return (
    <div className="trainer-card">
      <h3>{name}</h3>
      <p>Specialization: {specialization}</p>
      <p className={available ? "available" : "booked"}>{status}</p>
    </div>
  );
}
