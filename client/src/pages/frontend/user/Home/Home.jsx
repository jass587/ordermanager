import  { lazy } from "react";
import { Link } from "react-router-dom";
import { data } from "../../../../data/banner";

// const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../../../../components/frontend/Carousel"));
// const Carousel = lazy(() => import("../components/carousel/Carousel"));
// const CardIcon = lazy(() => import("../components/card/CardIcon"));
// const CardLogin = lazy(() => import("../components/card/CardLogin"));
// const CardImage = lazy(() => import("../components/card/CardImage"));

export default function Home() {

  return (
    <div className="p-4" style={{width : '100vw'}} >
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />

      {/* Categories Section */}

      <div className="bg-info bg-gradient p-3 text-center mb-3">
        <h4 className="m-0">Explore Fashion Collection</h4>
      </div>

      <div className="container">
        <div className="row">
          {[
            { src: "male.webp", label: "Men's Clothing" },
            { src: "female.webp", label: "Women's Clothing" },
            { src: "smartwatch.webp", label: "Smartwatch" },
            { src: "footwear.webp", label: "Footwear" },
          ].map((item, index) => (
            <div key={index} className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src={`../../images/category/${item.src}`}
                  className="img-fluid rounded-circle"
                  alt={item.label}
                />
                <div className="text-center h6">{item.label}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
