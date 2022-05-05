// import de react
import React from "react";

// import de link
import { Link } from "react-router-dom";

// imort de icons
import icons from "../assets/entreprisegroupo.png";

// construction de la page d'accueil
const Home = () => {
  return (
    <React.Fragment>
      <div className="card cardHome">
        <div className="card-header">
          <h2>Groupomania !</h2>
        </div>
        <div className="card-body">
          <p>
            Le seul réseau social d'entreprise pour échanger entre collègues
          </p>
        </div>
        <div className="card-footer">
          <p>
            {" "}
            <Link id="linkLogin" to="/login">
              connectez vous
            </Link>
          </p>
          <p>
           {" "}
            <Link id="linkSignup" to="/signup">
              Inscrivez vous
            </Link>
          </p>
        </div>
      </div>

      <div className=" text-center">
        <img
          className="img-fluid"
          src={icons}
          alt="icons de l'entreprise"
        />
      </div>
    </React.Fragment>
  );
};

// export de la page d'accueil
export default Home;
