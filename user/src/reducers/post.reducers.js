import { postConstants } from "../actions/constants"
const initialState = {
    loading: false,
    timeline: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case postConstants.TIMELINE_GET_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case postConstants.TIMELINE_GET_SUCCESS:
            state = {
                ...state,
                loading: false,
                timeline: action.payload.posts
            }
            break;
        case postConstants.POST_LIKE_REQUEST:
            state = {
                ...state,
            }
            break;
        
        case postConstants.POST_LIKE_SUCCESS:
            state = {
                ...state,
                timeline: action.payload.posts.posts
            }
            break;
    }
    return state;
}

