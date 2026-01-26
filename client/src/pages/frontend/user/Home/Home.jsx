import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { data } from '@data/banner';

const Banner = lazy(() => import('../../../../components/frontend/Carousel'));

export default function Home() {
  const categories = [
    { src: 'men.webp', label: 'Men', link: '/products' },
    { src: 'female.webp', label: 'Women', link: '/products' },
    { src: 'kids.webp', label: 'Kids', link: '/products' },
    { src: 'beauty.webp', label: 'Beauty', link: '/products' },
    { src: 'home.webp', label: 'Home & Living', link: '/products' },
    { src: 'accessories.webp', label: 'Accessories', link: '/products' },
    { src: 'footwear.webp', label: 'Footwear', link: '/products' },
    { src: 'sportswear.webp', label: 'Sportswear', link: '/products' },
  ];

  const features = [
    {
      icon: 'fa-truck-fast',
      title: 'Free Shipping',
      desc: 'On orders over ₹499',
    },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Chat or call anytime' },
    { icon: 'fa-rotate', title: 'Easy Returns', desc: '7-day return policy' },
    {
      icon: 'fa-lock',
      title: 'Secure Payment',
      desc: '100% encrypted checkout',
    },
  ];

  return (
    <div className="bg-light">
      {/* Banner */}
      <div className="container-fluid px-0">
        <Suspense fallback={<div className="py-5"></div>}>
          <Banner id="carouselHomeBanner" data={data.banner} />
        </Suspense>
      </div>

      {/* Featured Services */}
      <div className="container py-4 py-md-5">
        <div className="row g-3 g-md-4 text-center">
          {features.map((f, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="h-100 p-3 p-md-4 border rounded bg-white shadow-sm">
                <i className={`fa-solid ${f.icon} fa-2x text-primary mb-2`} />
                <h6 className="fw-bold mb-1">{f.title}</h6>
                <p className="mb-0 text-muted small">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container py-4 py-md-5">
        <div className="text-center mb-3 mb-md-4">
          <h4 className="fw-bold">Explore Fashion Collection</h4>
          <p className="text-muted small">
            Trendy styles across all categories just for you
          </p>
        </div>

        <div className="row g-3 g-lg-4">
          {categories.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="h-100 border rounded shadow-sm bg-white overflow-hidden">
                  <img
                    src={`/images/categories/${item.src}`}
                    alt={item.label}
                    className="img-fluid w-100"
                    style={{ aspectRatio: '4 / 5', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <h6 className="text-center fw-semibold py-2 mb-0">
                    {item.label}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="container py-4 py-md-5">
        <div className="bg-primary text-white p-4 p-md-5 rounded text-center shadow">
          <h5 className="fw-bold">Limited Time Offer!</h5>
          <p className="mb-3">Get up to 50% OFF on top categories</p>
          <Link to="/products" className="btn btn-light fw-bold">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
