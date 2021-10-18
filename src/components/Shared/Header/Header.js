import "./Header.css";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../images/logo.png";
import { useEffect, useState } from "react";
import navItemData from "./HeaderItem";

const Header = () => {
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [toggleNav, setToggleNav] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 992) {
      setButton(false);
      setIsMobileDevice(true);
    } else {
      setButton(true);
      setIsMobileDevice(false);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const scrollHeight = isMobileDevice ? 80 : 150;

  const chagneBackground = () => {
    if (window.scrollY >= scrollHeight) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", chagneBackground);

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  };

  return (
    <div className={navbar ? "header active" : "header"}>
      <Container className="d-flex justify-content-between align-items-center">
        <div className="header_logo_div">
          <img className="img-fluid" src={logo} alt="Tinzer" />
        </div>
        <nav className="nav_bar">
          <ul className={toggleNav ? "nav_menu" : "nav_menu active"}>
            {navItemData.map((item, ind) => {
              const { location, navText } = item;
              return (
                <li key={ind} className="nav_item">
                  <NavLink
                    onClick={handleToggleNav}
                    activeClassName="active_nav"
                    className="nav_link"
                    to={location}
                  >
                    {navText}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {button ? (
          <div className="get_a_quote">
            <Link className="get_a_quote_btn" to="/">
              Get A Quote
            </Link>
          </div>
        ) : (
          <span onClick={handleToggleNav} className="humberger_menu">
            {toggleNav ? (
              <i className="fas fa-bars"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </span>
        )}
      </Container>
    </div>
  );
};

export default Header;
