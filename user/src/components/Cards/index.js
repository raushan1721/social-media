import React, { useState } from "react";
import "./index.css";
import Comments from "../../containers/Comments";
import { imageURL } from "../../urlConfig";
import axios from "../../helpers/axios";
import { Dropdown} from "react-bootstrap";
import EditPost from "../../containers/EditPost";
import { postLike } from "../../actions";
import { useDispatch } from "react-redux";
function Cards({ post }) {
  const dispatch = useDispatch();
  const [showcommentbox, setShowcommentBox] = useState(false);
  const currentuser = JSON.parse(window.localStorage.getItem("user"));
  const [showEdit, setShowEdit] = useState(false);
  const like = <i class="fas fa-heart" style={{ color: "red" }}></i>;
  const notlike = <i class="far fa-heart" style={{ color: "red" }}></i>;
  const handleLike = async (postId) => {
    // await axios.put(`/post/${postId}/like/`);
    dispatch(postLike(postId));
  };
  const handleDelete=async (postId) => {
    await axios.delete("/post/" + postId + "/");
    window.location.replace("/");
  }
  return (
    <div className="post">
      <div className="postTop">
        <div className="postTopLeft">
          <div>{post.user.username[0].toUpperCase()}</div>
          <span>
            <div className="postUsername">{post.user.username}</div>
            <div className="postTime">{post.updatedAt.slice(0, 10)}</div>
          </span>
        </div>
        {post.user._id == currentuser._id ? (
          <div className="postTopRight">
            <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:"#fff",border:"none",padding:"0",color:"black"}} bsPrefix="p-0" id="dropdown-basic" >
  <i class="fas fa-ellipsis-v " ></i>
  </Dropdown.Toggle>

              <Dropdown.Menu >
                
                <Dropdown.Item onClick={() => setShowEdit(true)}>Edit</Dropdown.Item>
                <EditPost setShowEdit={setShowEdit} showEdit={showEdit} postId={post._id}/>
    <Dropdown.Item onClick={()=>handleDelete(post._id)}>Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </div>
        ) : null}
      </div>
      <div className="postCenter">
        <div className="postDescription">{post.description}</div>
        <img src={imageURL + post.image} alt="" />
      </div>
      <div className="postBottom">
        <div className="postSubTop">
          <span className="postLike" style={{ cursor: "pointer" }}>
            <span
              className="likeLogo"
              style={{ marginRight: "3px" }}
              onClick={() => handleLike(post._id)}
            >
              {post.likes?.includes(currentuser._id) ? like : notlike}
            </span>
            {post.likes?.length > 0 ? `${post.likes.length} likes` : ""}
          </span>
          <span
            className="comment"
            style={{ cursor: "pointer" }}
            onClick={() => setShowcommentBox(!showcommentbox)}
          >
            comments
          </span>
        </div>
        <div className="postSubBottom">
          <Comments show={showcommentbox} postId={post._id} />
        </div>
      </div>
    </div>
  );
}

export default Cards;
