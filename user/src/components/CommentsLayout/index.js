import React, { useState } from "react";
import "./index.css";
import axios from "../../helpers/axios";
import { useDispatch } from "react-redux";
import { getComments } from "../../actions";
function CommentsLayout({postId,...rest}) {
  console.log()
  const currentuser = JSON.parse(window.localStorage.getItem("user"));
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const post = postId;
    await axios.post("/comment/", { post, description })
      .then((res) => {
        dispatch(getComments(postId));
        setDescription("");
      })
    .catch(error=>console.log(error))
  }
  return (
    <div className="comments">
      <div className="createComment">
        <div>{currentuser.username[0].toUpperCase()}</div>
        <textarea
          placeholder="comment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="postCommentBtn" onClick={handleSubmit}>comment</button>
      </div>
      {rest.children}
    </div>
  );
}

export default CommentsLayout;
