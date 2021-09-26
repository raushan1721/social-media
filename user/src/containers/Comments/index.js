import React, { useEffect, useState } from "react";
import CommentsLayout from "../../components/CommentsLayout";
import CommentBox from "../../components/CommetBox";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../actions";
function Comments({ show, postId }) {
  const dispatch = useDispatch();
  const c = useSelector((state) => state.comments);
  const loading = c.loading;
  const commentList = c.comments;

  useEffect(() => {
    if (show) {
      dispatch(getComments(postId));
    }
  }, [show]);

  return (
    <>
      {show ? (
        <CommentsLayout postId={postId}>
          <div
            style={{
              background: "rgb(207, 207, 207)",
              borderRadius: "5px",
              padding: "5px 6px",
            }}
          >
            {commentList?.map((c) => (
              <CommentBox comment={c} />
            ))}
          </div>
        </CommentsLayout>
      ) : (
        ""
      )}
    </>
  );
}

export default Comments;
