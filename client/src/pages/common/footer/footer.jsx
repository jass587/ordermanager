import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Logo & About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">ECOMM.WIRED</h5>
            <p>
              Your one-stop destination for all things fashion, tech, and lifestyle. Shop with ease and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><Link to="/home" className="text-white text-decoration-none">Home</Link></p>
            <p><Link to="/products" className="text-white text-decoration-none">Products</Link></p>
            <p><Link to="/about" className="text-white text-decoration-none">About Us</Link></p>
            <p><Link to="/contact" className="text-white text-decoration-none">Contact</Link></p>
          </div>

          {/* Contact */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="bi bi-house-door me-2"></i> New Delhi, India</p>
            <p><i className="bi bi-envelope me-2"></i> support@ecommwired.com</p>
            <p><i className="bi bi-telephone me-2"></i> +91 635 888 888</p>
          </div>

          {/* Socials */}
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-github fs-5"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-4 text-white" />

        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">© {new Date().getFullYear()} Ecomm.Wired. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
