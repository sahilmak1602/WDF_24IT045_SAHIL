import { useEffect, useState } from "react";

import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import Repository from "./components/Repository";

import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/sahilmak1602/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories.");
        }

        return response.json();
      })
      .then((data) => {
        setRepositories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Sahil Makwana</h1>
        <p>My GitHub Repositories</p>
      </header>

      <main>
        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && (
          <div className="repository-container">
            {repositories.length > 0 ? (
              repositories.map((repository) => (
                <Repository
                  key={repository.id}
                  repository={repository}
                />
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;