import { useEffect, useMemo, useState } from 'react';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import RepoList from './components/RepoList';

const DEFAULT_USERNAME = 'octocat';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState(DEFAULT_USERNAME);

  const fetchRepos = async (selectedUsername) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.github.com/users/${selectedUsername}/repos?per_page=100`
      );

      if (!response.ok) {
        throw new Error(`Unable to fetch repositories for ${selectedUsername}.`);
      }

      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setRepos([]);
      setError(err.message || 'Something went wrong while fetching repositories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(DEFAULT_USERNAME);
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [repos, searchTerm]);

  const handleRetry = () => {
    fetchRepos(username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRepos(username);
  };

  return (
    <main className="app-shell">
      <section className="card">
        <header className="hero">
          <div>
            <p className="eyebrow">Practical 3</p>
            <h1>API Integration and Data Rendering in React</h1>
            <p className="subtitle">
              This page demonstrates loading, error, retry, search, and repository list rendering with the GitHub REST API.
            </p>
          </div>
        </header>

        <form className="toolbar" onSubmit={handleSubmit}>
          <label htmlFor="username">GitHub username</label>
          <div className="toolbar-row">
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter a GitHub username"
            />
            <button type="submit">Load repos</button>
          </div>
        </form>

        <label className="search-label" htmlFor="search">
          Search repositories by name
        </label>
        <input
          id="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Type a repository name"
        />

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <RepoList repos={filteredRepos} />
        )}
      </section>
    </main>
  );
}

export default App;
