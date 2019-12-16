const axios = require("axios");

const baseURL = "https://ec-nc-news.herokuapp.com/api";

exports.getTopics = () => {
  return axios
    .get(`${baseURL}/topics`)
    .then(({ data }) => {
      return data.topics;
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllArticles = topic => {
  return axios
    .get(`${baseURL}/articles`, { params: { topic } })
    .then(({ data }) => {
      return data.articles;
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSingleArticle = article_id => {
  return axios
    .get(`${baseURL}/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllComments = article_id => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch(err => {
      console.log(err);
    });
};
