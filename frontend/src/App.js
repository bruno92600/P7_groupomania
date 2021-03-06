// import des react pour useeffect et usestate 
import React, { useEffect, useState } from "react";

// import de router
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cookie from "js-cookie";

//import des components
import Routes from "./components/utils/Routes.jsx";
import AuthApi from "./components/utils/AuthApi.jsx";
import Logout from "./components/utils/Logout.jsx";

//import css
import { Navbar, Nav, Container } from "react-bootstrap";
import "./app.css";

//import des logos
import logo from "./assets/logo.png";
import icon from "./assets/icon.png";

// export de app
export default function App() {
  const [auth, setAuth] = useState(false);

  // indique qu'il doit executer d'autre chose après chaque affichage
  useEffect(function () {
    if (Cookie.get("user")) {
      setAuth(true);
    }
  }, []);

  // cnstruction du header (haut de page)
  let navLink;
  if (auth === true) {
    navLink = (
      <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <div>
            <Link to="/articles" className="nav-link">
              {window.screen.width > 500 ? (
                <img src={logo} alt="Le logo de Groupomania" />
              ) : (
                <img
                  src={icon}
                  alt="Le logo miniature de Groupomania"
                />
              )}
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse
            id="navbarResponsive"
            className="justify-content-end"
          >
            <Nav className="d-flex align-items-end">
              <Link to="/articles" className="nav-link mx-4">
                Tous les posts
              </Link>
              <Link to="/user" className="nav-link mx-4">
                Mon compte
              </Link>{" "}
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    navLink = (
      <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <div>
            <Link to="/" className="nav-link">
              {window.screen.width > 500 ? (
                <img src={logo} alt="Le logo de Groupomania" />
              ) : (
                <img
                  src={icon}
                  alt="Le logo miniature de Groupomania"
                />
              )}
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarResponsive2" />
          <Navbar.Collapse
            id="navbarResponsive2"
            className="justify-content-end"
          >
            <Nav className="align-items-end">
              <Link to="/signup" className="nav-link mx-3">
                S'inscrire
              </Link>
              <Link to="/login" className="nav-link mx-3">
                Se connecter
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          {navLink}
          <Routes />
        </Router>
      </AuthApi.Provider>
    </React.Fragment>
  );
}
