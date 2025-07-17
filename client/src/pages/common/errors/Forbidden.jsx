import "../../../assets/scss/app.scss"; 

export default function Forbidden({ fullScreen = true }) {
  return (
    <div className={`centered-error ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4">403 - Forbidden</h1>
      <p className="lead">You don’t have permission to access this page.</p>
    </div>
  );
}