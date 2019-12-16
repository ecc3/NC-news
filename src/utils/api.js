const axios = require("axios");
const request = axios.create({
  baseURL: "https://ec-nc-news.herokuapp.com/api"
});

export const getTopics = async () => {
  const { data } = await request.get(`/topics`);
  return data.topics;
};

export const getAllArticles = async (topic, sort_by, order) => {
  const { data } = await request.get(`/articles`, {
    params: { topic, sort_by, order }
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
  console.log(data);
  return data.user;
};
