import { commentConstants } from "../actions/constants";
const initialState = {
    loading: false,
    comments: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case commentConstants.COMMENT_GET_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case commentConstants.COMMENT_GET_SUCCESS:
            state = {
                ...state,
                loading: false,
                comments: action.payload.comments
            }
            break;
    }
    return state;
}