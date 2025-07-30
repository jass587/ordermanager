import { Truck, LifePreserver, ArrowCounterclockwise } from "react-bootstrap-icons";

const CardServices = () => {
  const services = [
    {
      icon: <Truck size={28} className="text-primary" />,
      title: "Free Delivery",
      subtitle: "From $59.89",
    },
    {
      icon: <LifePreserver size={28} className="text-primary" />,
      title: "Support 24/7",
      subtitle: "Online 24 hours",
    },
    {
      icon: <ArrowCounterclockwise size={28} className="text-primary" />,
      title: "Free return",
      subtitle: "365 a day",
    },
  ];

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">Custom Service</div>
      <div className="card-body">
        {services.map((s, i) => (
          <div
            key={i}
            className={`row ${i < services.length - 1 ? "border-bottom" : ""} py-3 align-items-center`}
          >
            <div className="col-2 text-center">
              {s.icon}
            </div>
            <div className="col">
              <div className="fw-bold">{s.title}</div>
              <p className="text-muted small mb-0">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardServices;
