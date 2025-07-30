import { Link } from "react-router-dom";

const Item = ({ item, index }) => (
  <div className={`carousel-item ${index === 0 ? "active" : ""}`} style={{ height: "512px" }}>
    <Link to={item.to}>
      <img
        src={item.image}
        alt={item.title}
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
      />
      {(item.title || item.description) && (
        <div className="carousel-caption d-none d-md-block">
          {item.title && <h5>{item.title}</h5>}
          {item.description && <p>{item.description}</p>}
        </div>
      )}
    </Link>
  </div>
);

const Indicator = ({ item, index }) => (
  <li
    data-bs-target={`#${item}`}
    data-bs-slide-to={index}
    className={`${index === 0 ? "active" : ""}`}
  />
);

const Banner = (props) => {
  // Clone and reorder the data array (optional customization)
  const reorderedData = [
    ...(props.data[2] ? [props.data[2]] : []),
    ...props.data.filter((_, index) => index !== 2),
  ];

  return (
    <div
      id={props.id}
      className={`carousel slide ${props.className || ""}`}
      data-bs-ride="carousel"
      style={{ height: "512px", width: "100vw", overflow: "hidden" }}
    >
      {/* Indicators */}
      <ol className="carousel-indicators">
        {reorderedData.map((item, index) => (
          <Indicator item={props.id} index={index} key={index} />
        ))}
      </ol>

      {/* Slides */}
      <div className="carousel-inner">
        {reorderedData.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </div>

      {/* Controls */}
      <a
        className="carousel-control-prev"
        href={`#${props.id}`}
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href={`#${props.id}`}
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Banner;
