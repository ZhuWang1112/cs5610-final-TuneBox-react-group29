import axios from "axios";
const COMMENT_API = process.env.REACT_APP_API_BASE + "/api/comment";
axios.defaults.withCredentials = true;

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