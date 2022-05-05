// import de react 
import React from "react";

// import de js cookie
import Cookie from "js-cookie";

// export de la fonction
export default function Logout() {
  // pour se deconnecter 
  function logout() {
    Cookie.remove("user");
    localStorage.clear();
    window.location.reload();
  }

  return (
    <a href="/#" className="nav-link mx-3" onClick={logout}>
      Se déconnecter
    </a>
  );
}
