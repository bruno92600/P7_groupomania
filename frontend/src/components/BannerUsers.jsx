// import react useeffect et usestate
import React, { useEffect, useState } from "react";

// export de la fonction (banniere d'affichage des users)
export default function BannerUsers() {
  const storage = JSON.parse(localStorage.getItem("token"));
  const token = "Bearer " + storage.token;

  const [users, setUsers] = useState();

  useEffect(
    function () {
      // fetch pour se connecter a la bdd (sql) get ("recuperer/chercher")
      fetch("http://localhost:4200/api/users/getAllUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (result) {
          setUsers(result);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token]
  );

  if (users === undefined) {
    return <h2>Chargement ...</h2>;
  } else {
    return (
      <div className="card" style={{ width: "300px" }}>
        <div className="card-header">
          <h6>Voici vos collègues sur Groupomania !</h6>
        </div>

        <ul>
          {users.map(function (user, index) {
            return (
              <li
                key={`${user.id}-${index}`}
                style={{ listStyle: "none", paddingTop: "10px" }}
              >
                <img
                  src={user.imageUrl}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                  alt="la miniature de l'avatar de l'utilisateur"
                />
                {user.firstName + " " + user.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
