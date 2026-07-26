function RepoList({ repos }) {
  if (!repos.length) {
    return <p>No repositories found.</p>;
  }

  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <li key={repo.id} className="repo-card">
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
          <p>{repo.description || 'No description provided.'}</p>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;
