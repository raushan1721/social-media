import React, { useState } from "react";
import "./index.css";
import axios from "../../helpers/axios";
import { Modal } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../actions";
function CommentBox({ comment }) {
  const currentuser = JSON.parse(window.localStorage.getItem("user"));
  const [description, setDescrition] = useState(comment.description);
  const [editcommentshow, setEditcommentshow] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = async () => {
    // setEditcommentshow(true);
    await axios
      .put("/comment/" + comment._id + "/", { description })
      .then((res) => {
        dispatch(getComments(comment.post));
        setEditcommentshow(false);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = async () => {
    await axios.delete("/comment/" + comment._id + "/");
    dispatch(getComments(comment.post));
  };
  return (
    <div className="commentBox">
      <div className="cdesc">{comment.description}</div>
      <div className="cbuttons">
        {currentuser._id == comment.user ? (
          <>
            <span onClick={()=>setEditcommentshow(true)}>Edit</span>
            <Modal show={editcommentshow}>

              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  update comment
                </Modal.Title>
                <button
                  style={{ border: "none", background: "#fff" }}
                  onClick={() => setEditcommentshow(false)}
                >
                  <i
                    class="fas fa-times-circle"
                    style={{ fontSize: "25px" }}
                  ></i>
                </button>
              </Modal.Header>
              <Modal.Body>
                <input
                  value={description}
                  style={{ width: "100%", outline: "none", padding: "2px 5px" }}
                  onChange={(e) => setDescrition(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleEdit}>
                  update
                </Button>
              </Modal.Footer>
            </Modal>


            <span onClick={handleDelete}>Delete</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default CommentBox;
