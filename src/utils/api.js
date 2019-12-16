const axios = require("axios");

const baseURL = "https://ec-nc-news.herokuapp.com/api";

exports.getTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics;
  });
};

exports.getAllArticles = (topic, sort_by) => {
  return axios
    .get(`${baseURL}/articles`, { params: { topic, sort_by } })
    .then(({ data }) => {
      return data.articles;
    });
};

exports.getSingleArticle = article_id => {
  return axios.get(`${baseURL}/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

exports.getAllComments = article_id => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};
