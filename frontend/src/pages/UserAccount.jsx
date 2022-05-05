// import de react
import React from "react";

// import des components
import UserUpdate from "../components/UserUpdate";
import UserArticles from "../components/UserArticles";

// export de la fonction
export default function UserAccount() {

  // qui nous renvoie vers d'autres pages
  return (
    <>
      <UserUpdate />
      <UserArticles />
    </>
  );
}
