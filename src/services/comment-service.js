import axios from "axios";
const COMMENT_API = "http://localhost:4000/api/comment";

export const findComments = async (userId) => {
    const response = await axios.get(`${COMMENT_API}/${userId}`);
    return response.data;
}
export const deleteComment = async (cid) => {
  const response = await axios.delete(`${COMMENT_API}/${cid}`);
  return response.data;
};
