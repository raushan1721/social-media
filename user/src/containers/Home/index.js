import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Cards from "../../components/Cards";
import Button from "@restart/ui/esm/Button";
import "./index.css";
import axios from "../../helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { timeline } from "../../actions";
function Home() {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);

  const dispatch = useDispatch();
  const timelineObj = useSelector(state => state.timeline);

  const currentuser = JSON.parse(window.localStorage.getItem("user"));
  const handleProductPicture = (e) => {
    setPostImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("postImage", postImage);
    form.append("description", description);

    await axios
      .post("/post", form)
      .then((res) => {
        dispatch(timeline());
        setShow(false);
      })
      .catch((error) => console.log(error));
  };
  const loading = timelineObj.loading;
  let postList = timelineObj.timeline;
  useEffect(() => {
    dispatch(timeline());
  }, []);

  if(postList)
  postList = postList.sort((a, b) => new Date(...b.createdAt.split('/').reverse())- new Date(...a.createdAt.split('/').reverse()));
  return (
    <Layout>
      <Row style={{ width: "100%", margin: "0" }}>
        <Col md={3}></Col>
        <Col md={6} style={{ padding: "0" }}>
          <div className="createpost">
            <div>{currentuser.username[0].toUpperCase()}</div>

            <button onClick={() => setShow(true)}>
              whats on your mind, {currentuser.username.toUpperCase()}?
            </button>

            <Modal
              // {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={() => setShow(false)}
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Create Post
                </Modal.Title>
                <button
                  style={{ border: "none", background: "#fff" }}
                  onClick={() => setShow(false)}
                >
                  <i
                    class="fas fa-times-circle"
                    style={{ fontSize: "25px" }}
                  ></i>
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
                  onChange={handleProductPicture}
                ></input>
              </Modal.Body>
              <Modal.Footer>
                <Button className="createPostButton" onClick={handleSubmit}>
                  Post
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
          {loading ? (
            <h1>loading...</h1>
          ) : (
            postList?.map((post) => <Cards post={post} />)
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </Layout>
  );
}

export default Home;
