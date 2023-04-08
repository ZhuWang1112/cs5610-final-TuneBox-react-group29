import { createSlice } from "@reduxjs/toolkit";

const commentData = [
  {
    _id: 1,
    songName: "abc",
    artist: "shutong",
    img: "comment-picture.png",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    _id: 2,
    songName: "bcd",
    artist: "cst",
    img: "comment-picture.png",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const commentSlice = createSlice({
  name: "comment",
  initialState: commentData,
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
      const index = state.findIndex(
        (comment) => comment._id === action.payload
      );
      state.splice(index, 1);
    },
  },
});

export const { createComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;