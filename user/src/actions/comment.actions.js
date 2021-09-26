import { commentConstants } from "./constants";
import axios from "../helpers/axios";

export const getComments = (postId) => {
    return async dispatch => {
        dispatch({
            type: commentConstants.COMMENT_GET_REQUEST
        });

        const res = await axios.get(`/comment/${postId}/`);
        if (res.status === 200) {
            dispatch({
                type: commentConstants.COMMENT_GET_SUCCESS,
                payload: { comments: res.data.commentList }
            });
        }
    }
}