import axios from "axios";
const COMMENT_API = "http://localhost:4000/api/comment";

export const createComment = async (comment) => {
  const response = await axios.post(`${COMMENT_API}`, comment);
  return response.data;
};

export const findComments = async (userId) => {
  const response = await axios.get(`${COMMENT_API}/${userId}`);
  return response.data;
};

export const deleteComment = async (commentObj) => {
  const response = await axios.delete(`${COMMENT_API}`, {
    data: {
      commentObj,
    },
  });
  return response.data;
};
export const findCommentsByPlaylist = async (pid) => {
  const response = await axios.get(`${COMMENT_API}/playlist/${pid}`);
  return response.data;
};