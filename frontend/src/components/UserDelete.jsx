// import de react
import React from "react";

// import de js-cookie
import Cookie from "js-cookie";

// import de component
import AuthApi from "../components/utils/AuthApi";

// export de la fonction
export default function UserDelete() {
  const Auth = React.useContext(AuthApi);

  // utilisation du local storage
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const submit = async function (e) {
    e.preventDefault();
    if (
      window.confirm(
        "Voulez vous vraiment supprimer votre compte ?"
      )
    ) {
      // fetch pour se connecter a la bdd (sql) delete (supprimer)
      fetch("http://localhost:4200/api/users/userDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (res) {
          Auth.setAuth(false);
          localStorage.clear();
          Cookie.remove("user");
          return res.json();
        })
        .catch(function (error) {
          return error;
        });
    } else {
    }
  };

  return (
    <button
      onClick={submit}
      className="w-100 btn btn-lg btn-danger btnUser mb-2"
      type="submit"
    >
      Supprimer{" "}
    </button>
  );
}
