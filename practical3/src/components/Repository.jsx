function Repository({ repository }) {
  return (
    <div className="repository">
      <h2>{repository.name}</h2>

      <p>
        {repository.description || "No description available."}
      </p>

      <p>
        ⭐ Stars: {repository.stargazers_count}
      </p>

      <p>
        🍴 Forks: {repository.forks_count}
      </p>

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default Repository;