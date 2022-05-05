// import de react et use state
import React, { useState } from "react";

// imoort des components
import GetComments from "../components/GetComments";
import GetOneArticle from "../components/GetOneArticle";
import PostComment from "../components/PostComment";

// export de la fonction 
export default function OneArticle() {
  const [comment, setComment] = useState(0);

  // nous renvoie sur d'autres pages
  return (
    <>
      <GetOneArticle />
      <GetComments comment1={comment} />
      <PostComment comment1={comment} setComment1={setComment} />
    </>
  );
}
