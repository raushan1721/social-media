import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "../../helpers/axios";
import {  useDispatch } from "react-redux";
import { timeline } from "../../actions";
function EditPost({ showEdit, setShowEdit, postId }) {
  const [description, setDescription] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const dispatch = useDispatch();
  const handleEdit = async () => {

        const form = new FormData();
        if(description)
            form.append("description", description);
        if(postImage)
            form.append("postImage", postImage);

        await axios.put("/post/" + postId + "/", form)
          .then((res) => {
            dispatch(timeline());
            showEdit(false);

            })
            .catch((error) => console.log(error))
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showEdit}
      onHide={() => setShowEdit(false)}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your Post
        </Modal.Title>
        <button
          style={{ border: "none", background: "#fff" }}
          onClick={() => setShowEdit(false)}
        >
          <i class="fas fa-times-circle" style={{ fontSize: "25px" }}></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="postDesc"
          placeholder="whats on your , mind? Raushan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {postImage ? (
          <div className="previewImage">
            <img
              style={{
                borderRadius: "20px",
                width: "200px",
                height: "200px",
              }}
              src={URL.createObjectURL(postImage)}
              alt=""
            />
            <i
              class="fas fa-times-circle"
              style={{ fontSize: "25px" }}
              onClick={() => setPostImage(null)}
            ></i>
          </div>
        ) : null}

        <input
          type="file"
          className="postFile"
          accept="image/*"
          name="productPicture"
          onChange={(e) => setPostImage(e.target.files[0])}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <Button className="createPostButton" onClick={handleEdit}>
          update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPost;
