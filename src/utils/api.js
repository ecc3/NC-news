const axios = require("axios");

const baseURL = "https://ec-nc-news.herokuapp.com/api";

exports.getTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics;
  });
};

exports.getAllArticles = () => {
  return axios.get(`${baseURL}/articles`).then(({ data }) => {
    return data.articles;
  });
};
