import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCommentThunk,
  findCommentsThunk,
} from "../services/thunks/comment-thunk.js";

const commentSlice = createSlice({
  name: "comment",
  initialState: {comments: []},
  reducers: {
    createComment(state, action) {
      const newComment = {
        _id: action.payload,
        name: "random",
        img: "comment-picture.png",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      };
      state.push(newComment);
    },

    deleteComment(state, action) {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload
      );
      state.comments.splice(index, 1);
    },
  },
  extraReducers: {
    [findCommentsThunk.fulfilled]: (state,{ payload }) => {
        console.log("comment payload", payload)
      state.comments = payload;
    },
    [deleteCommentThunk.fulfilled]: (state, { payload }) => {
        state.comments = state.comments
                    .filter(c => c._id !== payload)
    },
  },
});

export const { createComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
