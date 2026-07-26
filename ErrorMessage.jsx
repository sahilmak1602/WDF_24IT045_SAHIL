function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card">
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

export default ErrorMessage;
