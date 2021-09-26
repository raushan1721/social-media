import postReducers from "./post.reducers";
import { combineReducers } from "redux";
import commentReducers from "./comment.reducers";
const rootReducers = combineReducers({
    timeline: postReducers,
    comments:commentReducers
});

export default rootReducers;