import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { data } from "@data/banner";

// Lazy load banner
const Banner = lazy(() => import("../../../../components/frontend/Carousel"));

export default function Home() {
  const categories = [
    { src: "men.webp", label: "Men", link: "/products" },
    { src: "female.webp", label: "Women", link: "/products" },
    { src: "kids.webp", label: "Kids", link: "/products" },
    { src: "beauty.webp", label: "Beauty", link: "/products" },
    { src: "home.webp", label: "Home & Living", link: "/products" },
    { src: "sale-banner-1.webp", label: "Accessories", link: "/products" },
    { src: "sale-banner-2.webp", label: "Footwear", link: "/products" },
    { src: "sale-banner-3.webp", label: "Sportswear", link: "/products" },
  ];

  const features = [
    { icon: "fa-truck-fast", title: "Free Shipping", desc: "On orders over ₹499" },
    { icon: "fa-headset", title: "24/7 Support", desc: "Chat or call anytime" },
    { icon: "fa-rotate", title: "Easy Returns", desc: "7-day return policy" },
    { icon: "fa-lock", title: "Secure Payment", desc: "100% encrypted checkout" },
  ];

  return (
    <div className="w-100 bg-light">
      {/* Banner */}
      <div className="container-fluid px-0">
        <div className="banner-wrapper">
          <Suspense fallback={<div style={{ height: '200px' }}></div>}>
            <Banner className="w-100" id="carouselHomeBanner" data={data.banner} />
          </Suspense>
        </div>
      </div>

      {/* Featured Services */}
      <div className="container py-4">
        <div className="row text-center g-4">
          {features.map((f, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="p-3 border rounded shadow-sm bg-white h-100">
                <i className={`fa-solid ${f.icon} fa-2x text-primary mb-2`}></i>
                <h6 className="fw-bold mb-1">{f.title}</h6>
                <p className="mb-0 text-muted small">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h4 className="fw-bold">Explore Fashion Collection</h4>
          <p className="text-muted">Trendy styles across all categories just for you</p>
        </div>

        <div className="row justify-content-center g-4">
          {categories.map((item, index) => (
            <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="category-tile text-center">
                  <div className="category-img-container mx-auto">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`/images/banner/${item.src}`}
                      alt={item.label}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h5 className="mt-3 fw-semibold">{item.label}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="container py-5">
        <div className="bg-primary text-white p-4 rounded text-center shadow">
          <h5 className="fw-bold">Limited Time Offer!</h5>
          <p className="mb-2">Get up to 50% OFF on top categories</p>
          <Link to="/products" className="btn btn-light fw-bold">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
