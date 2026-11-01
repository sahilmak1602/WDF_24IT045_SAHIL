import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    alert(`Thank you ${name}! Your message has been submitted.`);
  }

  return (
    <div className="page">
      <h1>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />

        <label>Message:</label>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your message"
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <h3>Live Preview</h3>

      <p>Your name: {name}</p>

      <p>Your message: {message}</p>
    </div>
  );
}

export default Contact;