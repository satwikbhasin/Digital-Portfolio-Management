import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styling/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const userNavbar = () => {
  return (
    <>
      <Navbar className="navbar-dark navbar-first-user primary-bg">
        <NavLink className="navbar-brand text-center ms-3" to="/user/">
          <h1 className="navbar-first-heading">HEALTHKARE</h1>
        </NavLink>
      </Navbar>
      <Navbar className="navbar-second-user justify-content-left secondary-bg">
        <NavItem className="link-holder">
          <NavLink
            className={
              window.location.pathname === "/user/products" ||
              window.location.pathname === "/user/products/"
                ? "active-link"
                : "inactive-link"
            }
            to="/user/products"
          >
            <div className="d-flex align-items-center justify-content-center">
              <i class="bi bi-box fs-4 me-1"></i>
              <span className="mt-2">
                <h5>Products</h5>
              </span>
            </div>
          </NavLink>
        </NavItem>
        <NavItem className="link-holder">
          <NavLink
            className={
              window.location.pathname === "/user/contact" ||
              window.location.pathname === "/user/contact/"
                ? "active-link"
                : "inactive-link"
            }
            to="/user/contact"
          >
            <div className="d-flex align-items-center justify-content-center">
              <i class="bi bi-person-vcard fs-4 me-1"></i>
              <span className="mt-2">
                <h5>Contact</h5>
              </span>
            </div>
          </NavLink>
        </NavItem>
      </Navbar>
    </>
  );
};

export default userNavbar;
