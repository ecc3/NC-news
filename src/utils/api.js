const axios = require("axios");
const request = axios.create({
  baseURL: "https://ec-nc-news.herokuapp.com/api"
});

export const getTopics = async () => {
  const { data } = await request.get(`/topics`);
  return data.topics;
};

export const getAllArticles = async (topic, sort_by, order, author) => {
  const { data } = await request.get(`/articles`, {
    params: { topic, sort_by, order, author }
  });
  return data.articles;
};

export const getSingleArticle = async article_id => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
};

export const getAllComments = async article_id => {
  const { data } = await request.get(`/articles/${article_id}/comments`);
  return data.comments;
};

export const getUserByUsername = async username => {
  const { data } = await request.get(`/users/${username}`);
  return data.user;
};

export const postNewComment = async (article_id, username, body) => {
  const { data } = await request.post(`/articles/${article_id}/comments`, {
    username,
    body
  });
  return data.comment;
};

export const deleteComment = async comment_id => {
  await request.delete(`/comments/${comment_id}`);
  return;
};

export const patchVotes = async (type, type_id, amount) => {
  const { data } = await request.patch(`/${type}/${type_id}`, {
    inc_votes: amount
  });
  return data[type.slice(0, -1)];
};
