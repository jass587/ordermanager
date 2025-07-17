export default function DefaultError({ fullScreen =  true}) {
  return (
    <div className={`centered-error ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4 text-danger">Something Went Wrong</h1>
      <p className="lead">We encountered an unexpected error. Please try again later.</p>
    </div>
  );
}