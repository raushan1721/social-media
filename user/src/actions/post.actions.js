import axios from "../helpers/axios";
import { postConstants } from "./constants";

export const timeline = () => {
    return async dispatch => {
        dispatch({
            type: postConstants.TIMELINE_GET_REQUEST
        });
        const res = await axios.get("/timeline");
        if (res.status === 200) {
            const { posts } = res.data;
            dispatch({
                type: postConstants.TIMELINE_GET_SUCCESS,
                payload: { posts: posts }
            })
        }
}
}

export const postLike = (postId) => {
    return async dispatch=>{
        dispatch({
            type: postConstants.POST_LIKE_REQUEST
        });

        const res=await axios.put(`post/${postId}/like`);
        if (res.status === 200) {
            const timeline = await axios.get("/timeline");
            dispatch({
                type: postConstants.POST_LIKE_SUCCESS,
                payload: { posts:timeline.data }
    })
}
    }
}

export const addPost =  (form) => {
    return async dispatch => {
        dispatch({
            type: postConstants.POST_CREATE_REQUEST
        });
        const res = await axios.post("/posts", form);
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: postConstants.POST_CREATE_SUCCESS,
                payload: res.data.posts
        })
    }
}
}