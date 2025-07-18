const CardServices = () => {
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">Custom Service</div>
      <div className="card-body">
        <div className="row border-bottom align-items-center">
          <div className="col-2 text-center">
            <i className="bi bi-truck fs-2 text-primary" />
          </div>
          <div className="col">
            <span className="fw-bold">Free Delivery</span>
            <p className="text-muted small">From $59.89</p>
          </div>
        </div>
        <div className="row border-bottom py-3 align-items-center">
          <div className="col-2 text-center">
            <i className="bi bi-life-preserver fs-2 text-primary" />
          </div>
          <div className="col">
            <span className="fw-bold">Support 24/7</span>
            <p className="text-muted small m-0">Online 24 hours</p>
          </div>
        </div>
        <div className="row pt-3 align-items-center">
          <div className="col-2 text-center">
            <i className="bi bi-arrow-counterclockwise fs-2 text-primary" />
          </div>
          <div className="col">
            <span className="fw-bold">Free return</span>
            <p className="text-muted small m-0">365 a day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServices;
