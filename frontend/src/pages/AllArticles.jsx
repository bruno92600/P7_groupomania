// import de react et usestate
import React, { useState } from "react";

//import des components
import BannerUsers from "../components/BannerUsers";
import CreateArticle from "../components/CreateArticle";
import GetArticles from "../components/GetArticles";

// export de la fonction
export default function Articles() {
  const [articles, setArticles] = useState(0);

  // nous renvoie sur d'autres pages
  return (
    <div>
      <div className="bannerUsers">
        <BannerUsers />
      </div>
        <CreateArticle article1={articles} setArticle1={setArticles} />
        <GetArticles article1={articles} />
    </div>
  );
}
