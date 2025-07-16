
export default function ServerError({ fullScreen = true }) {
  return (
    <div className={`centered-error ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4">500 - Server Error</h1>
      <p className="lead">Something went wrong on our end.</p>
    </div>
  );
}